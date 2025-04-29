import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CompartidoService } from '../../../../services/general/general.service';
import { DocumentacionService } from '../../../../services/isid/FrmPrincipal/documentacion.service';
import { DocumentacionOt } from '../../../../models/isid/frmprincipal/documentacion';
import { ApiResponse } from '../../../../models/general/general';
import { Router } from '@angular/router';
import { SessionServiceService } from '../../../../services/login/guardarsesion/session-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { saveAs } from 'file-saver';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-documentacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PRIME_NG_IMPORTS,DividerModule],
  templateUrl: './documentacion.component.html',
  styleUrl: './documentacion.component.css'
})
export class DocumentacionComponent {
  //Array para almacenar tipoDocumento
  tipoDocFiltro: { label: string; value: string }[] = [];

  //Array para almacenar tipoDocumento
  tipoDoc: { label: string; value: string }[] = [];

  // Variable para el Formulario Reactivo filtro y carga documentos
  formFiltro: FormGroup;
  formCargaDocumento!: FormGroup;

  //arrays para documentacion
  documentacion: DocumentacionOt[] = [];
  documentacionFiltrada: DocumentacionOt[] = [];

  // control de  modal eliminar 
  controlModalEliminar: boolean = false;

  // Variable para Nombre de archivo a eliminar
  nombreArchivoSeleccionado: string = '';

  idDocumento: number = 0;

  @ViewChild('fileUploader') fileUploader!: FileUpload;



  constructor(private fb: FormBuilder, private compartidoServices: CompartidoService, private router: Router, private documentacionService: DocumentacionService, private sesion: SessionServiceService) {

    //Se Inicializa los controles del formualario reactivo filtro
    this.formFiltro = this.fb.group({
      tipoDocFiltro: [{ value: '' }],
      chkFiltroPed: [{ value: '', disabled: false }],

    });

    //Se Inicializa los controles del formualario reactivo Carga documentos
    this.formCargaDocumento = this.fb.group({
      observacion: ['', Validators.required],
      tipoDocumentoSeleccionado: ['', Validators.required]
    });


    // Inicializamos tipo de documento para filtrar
    this.tipoDocFiltro = [
      { label: 'Seleccione', value: '' },
      { label: 'CONTABLE', value: 'CONTABLE' },
      { label: 'CONTROL DIBUJO', value: 'CONTROL DIBUJO' },
      { label: 'OPERATIVO', value: 'OPERATIVO' },
      { label: 'PRODUCTIVO', value: 'PRODUCTIVO' },
      { label: 'DLLO ESPECIAL', value: 'DLLO ESPECIAL' },


    ];

    // Inicializar tipo de documento para guardar
    this.tipoDoc = [
      { label: 'Seleccione', value: '' },
      { label: 'CONTABLE', value: 'CONTABLE' },
      { label: 'OPERATIVO', value: 'OPERATIVO' },
      { label: 'PRODUCTIVO', value: 'PRODUCTIVO' }

    ];

  }

  ngOnInit() {
  
    // Esperamos un ciclo de detección para asegurarnos que el form está listo
    setTimeout(() => {
      this.formFiltro.patchValue({

        // Validar el departamento y dejar seleccionado el tipo de documento inicial
        tipoDocFiltro: 'PRODUCTIVO'
      });

      // Obtenemos el tipo de documento de filtro 
      const tipoDocumento = this.formFiltro.value.tipoDocFiltro;

      // Validar Departamento para habilitar o deshabilitar el select 
      this.formFiltro.get('tipoDocFiltro')?.disable();

      // Obtenemos la OT y cargamos documentación
      const estado = this.compartidoServices.obtenerEstadoOT();
      estado
        ? this.cargarDocumentacion(estado.ot, tipoDocumento)
        : this.redireccionarOT();
    });
  }


  cargarDocumentacion(ot: string, tipoDoc: string) {

    // se crea el dto para obtener Doc
    const dto = { ot, tipoDoc };

    this.documentacionService.ObtenerDocumentacion({ ot, tipoDoc }).subscribe({
      next: (response: ApiResponse) => {
        if (response.isExitoso) {
          this.documentacion = response.resultado.documentacion;
          // Llenar la tabla inicialmente
          this.documentacionFiltrada = [...this.documentacion];
        } else {
          console.error('Error del API:', response.mensaje);
        }
      },
      error: (err) => {
        console.error('Error HTTP:', err);
      }
    });



  }

  redireccionarOT() {
    this.router.navigate(['/isid/dashboard-frm-principal/orden-de-trabajo']);
  }

  filtrarDocumentacionPorPedido(event: any) {
    
    const estaChequeado = event.checked;
    const estado = this.compartidoServices.obtenerEstadoOT();


    if (estaChequeado && estado?.pedidoSeleccionado.consecutivoPedido) {
      // Filtramos los documentos que pertenecen al pedido actual
      this.documentacionFiltrada = this.documentacion.filter(doc => doc.pedido === estado?.pedidoSeleccionado.consecutivoPedido);
    } else {
      // Mostramos todo si el check está desactivado
      this.documentacionFiltrada = [...this.documentacion];
    }
  }

  //Validacion para cargar el archivo 
  SeleccionArchivo(event: any) {
    const archivo = event.files[0];
    if (archivo) {
      this.compartidoServices.mostrarAlerta("Archivo cargado", 'info')
    } else {
      this.compartidoServices.mostrarAlerta("No se pudo cargar el archivo", 'warn')
    }
  }


  subirArchivo(event: any) {

    // cargamos el archivo
    const archivo = event.files[0];

    if (this.formCargaDocumento.invalid || !archivo) {
      this.compartidoServices.mostrarAlerta('Por favor, completa los campos requeridos y selecciona un archivo.', 'warn');
      return;
    }

    // Validamos si hay Observacion y Tipo Doc 
    const Observacion = this.formCargaDocumento.get('observacion')?.value
    const tipoDoc = this.formCargaDocumento.get('tipoDocumentoSeleccionado')?.value

    const estado = this.compartidoServices.obtenerEstadoOT();
    
    //Validamos si hay OT y Pedido
    if (!estado) {
      this.compartidoServices.mostrarAlerta("Por favor seleccione una OT y Pedido")
    }
    const ot = estado?.ot ?? '';
    const pedido = estado?.pedidoSeleccionado.consecutivoPedido.toString() ?? ''


    // consultamos el nombre del usuario 
    const usuario = this.sesion.usuario?.nombreUsuario || 'Usuario desconocido';
    if (!usuario) {
      this.compartidoServices.mostrarAlerta("No se encontró el nombre del usuario")
    }

     // Se crea el formdata para la peticion 
    const formData = new FormData();
    formData.append('IdOT', ot);
    formData.append('ConsecutivoPedido', pedido);
    formData.append('Observacion', Observacion);
    formData.append('Usuario', usuario);
    formData.append('Archivo', archivo);
    formData.append('TipoDoc', tipoDoc);

    this.documentacionService.agregarArchivo(formData).subscribe({
      next: (response) => {

        // se carga nuevamente la tabla 
        this.cargarDocumentacion(ot, tipoDoc);

        // Limpiar los campos y dejar todo como al inicio 
        this.formCargaDocumento.reset();
        this.fileUploader.clear();

        this.compartidoServices.mostrarAlerta(response.datos, 'success');
      },
      error: (err: HttpErrorResponse) => {
        this.compartidoServices.mostrarAlerta('Error al subir archivo', 'error');
      },
    });

  }


  descargarArchivo(nombreArchivo: string, idDocumento: number) {
    
    // //Validamos si hay OT y Pedido
    const estado = this.compartidoServices.obtenerEstadoOT();
    if (!estado?.ot) {
      this.compartidoServices.mostrarAlerta("Por favor seleccione una OT y Pedido");
      return;
    }
    const ot = estado.ot.trim();

    // consultamos el nombre del usuario 
    const usuario = this.sesion.usuario?.nombreUsuario?.trim();
    if (!usuario) {
      this.compartidoServices.mostrarAlerta("No se encontró el nombre del usuario");
      return;
    }

    this.documentacionService.descargarArchivo(ot, nombreArchivo, idDocumento, usuario)
      .subscribe({
        next: (response: Blob) => {
          // Se realiza la descarga 
          saveAs(response, nombreArchivo);
        },
        error: (error: Error) => {

          this.compartidoServices.mostrarAlerta(error.message, 'error');
        }
      });


  }



  //Mostrar modal confirmar eliminar 
  abrirModalEliminar(nombreArchivo: string, IdDocumento: number): void {

    // Obtén el nombre del usuario
    var nombreUsuario = this.sesion.obtenerNombreUsuario();
    if (!nombreUsuario) {
      this.compartidoServices.mostrarAlerta('No se pudo obtener el nombre del usuario..', 'error');
      return;
    }
    // Mostrar el mensaje de confirmacion eliminacion 
    this.nombreArchivoSeleccionado = nombreArchivo;
    this.idDocumento = IdDocumento
    this.controlModalEliminar = true;
  }


  // Cierra el modal y cancela la eliminación
  cancelarEliminacion(): void {
    this.controlModalEliminar = false;
  }
  

  confirmarEliminar(): void {
    this.controlModalEliminar = false;

    // Obtén el nombre del usuario
    var nombreUsuario = this.sesion.obtenerNombreUsuario();
    if (!nombreUsuario) {
      this.compartidoServices.mostrarAlerta('No se pudo obtener el nombre del usuario..', 'error');
      return;
    }

    // Obtén la cedula  del usuario
    var cedulaUsuario = this.sesion.obtenerCedulaUsuario();
    if (!cedulaUsuario) {
      this.compartidoServices.mostrarAlerta('No se pudo obtener la cedula del usuario..', 'error');
      return;
    }

    // Aseguramos de que el idDocumento exista
    if (!this.idDocumento) {
      this.compartidoServices.mostrarAlerta('No se pudo obtener el ID del documento a eliminar.', 'error');
      return;
    }

     //Validar si hay OT y Pedido
    const estado = this.compartidoServices.obtenerEstadoOT();
    if (!estado) {
      this.compartidoServices.mostrarAlerta("Por favor seleccione una OT y Pedido")
    }
    const ot = estado?.ot ?? '';
    const pedido = estado?.pedidoSeleccionado.consecutivoPedido ?? 0

    // Activamos el tipo filtro y luego se deshabilita dependiendo de Departamento 
    this.formFiltro.get('tipoDocFiltro')?.enable();
    const tipoDoc = this.formFiltro.get('tipoDocFiltro')?.value
    this.formFiltro.get('tipoDocFiltro')?.disable();



    // Consumo servicio eliminarcion archivo
    this.documentacionService.eliminarArchivo(this.idDocumento, nombreUsuario, ot, pedido, cedulaUsuario)
      .subscribe({
        next: (resp) => {

          // se carga nuevamente la tabla 
          this.cargarDocumentacion(ot, tipoDoc);
          this.compartidoServices.mostrarAlerta(resp.mensaje || 'Archivo eliminado correctamente','success');
        },
        error: (err: Error) => {
          this.compartidoServices.mostrarAlerta(err.message, 'error');
        }
      });

  }

  onTipoDocFiltroChange() {

    const tipoDocumento = this.formFiltro.value.tipoDocFiltro;

    const estado = this.compartidoServices.obtenerEstadoOT();
      estado
        ? this.cargarDocumentacion(estado.ot, tipoDocumento)
        : this.redireccionarOT();

    const estaChequeado = this.formFiltro.get('filtroPorPedido')?.value;
  
    this.filtrarDocumentacionPorPedido({ checked: estaChequeado });
  }
  
  


}


