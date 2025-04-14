import { Component, Directive, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FrmPrincipalService } from '../../../../services/isid/FrmPrincipal/frm-principal.service';
import { CompartidoService } from '../../../../services/general/general.service';
import { ApiResponse, asesores, Pedidos, sede } from '../../../../models/general/general';
import { fechaDespacho, infoCliente, infoOT, plano, reporteContable } from '../../../../models/isid/frmprincipal/frmPrincipal';



@Component({
  selector: 'app-orden-de-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PRIME_NG_IMPORTS],
  templateUrl: './orden-de-trabajo.component.html',
  styleUrl: './orden-de-trabajo.component.css'
})
export class OrdenDeTrabajoComponent implements OnInit {

  //Anderson Betancur Melchor 

  // Variable para el Formulario Reactivo 
  formOT: FormGroup;

  // Respuesta  particular usando la interfaz generica para la respuesta 
  InfoPedido!: ApiResponse<{
    infoOT: infoOT;
    fechaDespacho: fechaDespacho[];
    infoCliente: infoCliente;
    plano: plano;
    reporteContable: reporteContable[];
  }>;

  // Variable para Estado Botones
  botones = {
    nuevaOT: true,
    guardar: true,
    modificarOT: true,
    eliminarOT: true,
    observaciones: false,
    imprimirOT: true,
    imprimirContable: true,
    cancelar: true,
    visualizarOT: false,
    importarOT: false,
    detenerProduccion: true,
    detenerDespacho: true,
    registrarPedido: true,
    abrirCerrarObra: true,
    obraReactivada: true,
    programarObras: true,
    anularObra: true,
    trojaProceso: true,
    actaEntrega: true
  };

  // Array Para almacenar los pedidos 
  pedidos: Pedidos[] = [];

  //Array de Fechas de Despacho 
  fechasDespacho: fechaDespacho[] = [];

  //Array para almacenar Sedes
  sedes: sede[] = [];

  //Array para almacenar Asesores
  Asesores: { label: string; value: string }[] = [];


  // Array para dias de intalacion
  diasInstalacion: { name: string, value: number }[] = [];

  // Array para  Zonas
  Zonas: { name: string, value: number }[] = [];

  // Array Para almacenar los reporte contable 
  reporteContable: reporteContable[] = [];

  // control de tamaño de tabla contable 
  modoSoloTabla: boolean = true;

  // Control de tamaño observacion
  obserControl: boolean = false;

  // control label Ot Cerrada
  ordenCerrada: boolean = false;
  posicionArriba: boolean = true;

  // control boton Ok
  botonOkControl: boolean = true;


  constructor(private fb: FormBuilder, private principalService: FrmPrincipalService, private servicioCompartido: CompartidoService) {

    //Se Inicializa los controles del formualario reactivo
    this.formOT = this.fb.group({
      OT: [''],
      Pedido: [''],
      TipoPed: [{ value: '', disabled: true }],
      Direccion: [{ value: '', disabled: true }],
      Ciudad: [{ value: '', disabled: true }],
      Dpto: [{ value: '', disabled: true }],
      Pais: [{ value: '', disabled: true }],
      Obra: [{ value: '', disabled: true }],
      Contacto: [{ value: '', disabled: true }],
      Mail: [{ value: '', disabled: true }],
      Base: [{ value: '', disabled: true }],
      chkActaEntrega: [{ value: false, disabled: true }],
      Telefono: [{ value: '', disabled: true }],
      Celular: [{ value: '', disabled: true }],
      Recibe: [{ value: '', disabled: true }],
      ObsOT: [{ value: '', disabled: true }],
      fechaVenta: [{ value: null, disabled: true }],
      chkProblemaFact: [{ value: false, disabled: true }],
      RazonFactura: [{ value: '', disabled: true }],
      fechaOkVenta: [{ value: null, disabled: true }],
      fechaOkDibujo: [{ value: null, disabled: true }],
      fechaEmpVenta: [{ value: null, disabled: true }],
      fechaOkEmp: [{ value: null, disabled: true }],
      fechaEmpProd: [{ value: null, disabled: true }],
      fechaOkDesp: [{ value: null, disabled: true }],
      fechaHabProducir: [{ value: null, disabled: true }],
      fechaInstalacion: [{ value: null, disabled: true }],
      fechaOkInsta: [{ value: null, disabled: true }],
      fechaOkFactura: [{ value: null, disabled: true }],
      Plano: [{ value: null, disabled: true }],
      RespFact: [{ value: null, disabled: true }],
      Supervisor: [{ value: null, disabled: true }],
      DiasInsta: [{ value: null, disabled: true }],
      FabPor: [{ value: null, disabled: true }],
      Instala: [{ value: null, disabled: true }],
      Nit: [{ value: null, disabled: true }],
      NombreCliente: [{ value: null, disabled: true }],
      ContactoCliente: [{ value: null, disabled: true }],
      DireccionCliente: [{ value: null, disabled: true }],
      Municipio: [{ value: null, disabled: true }],
      TelefonoCliente: [{ value: null, disabled: true }],
      ObsContable: [{ value: null, disabled: true }],
      Zona: [{ value: null, disabled: true }],
      FormaPago: [{ value: null, disabled: true }],
      asesor: [{ value: null, disabled: true }],
      CedulaAsesor: [{ value: null, disabled: true }],
      Cotizacion: [{ value: null, disabled: true }],
      Comision: [{ value: null, disabled: true }],
      Venta: [{ value: null, disabled: true }],
      PorcentajeDescuento: [{ value: null, disabled: true }],
      Descuento: [{ value: null, disabled: true }],
      Vtte: [{ value: null, disabled: true }],
      Viatico: [{ value: null, disabled: true }],
      Total: [{ value: null, disabled: true }],




    });
  }

  ngOnInit() {

    // Cargamos las sedes
    this.principalService.obstenerSedes().subscribe(
      (response: ApiResponse<sede[]>) => {
        if (response.isExitoso) {
          //  Extraemos `resultado` 
          this.sedes = response.resultado || [];
        }
      },
      (error) => {
        this.sedes = [];
      }
    );

    // Cargamos los dias de instalacion 
    this.diasInstalacion = Array.from({ length: 90 }, (_, i) => ({
      name: (i + 1).toString(),
      value: i + 1
    }));

    // Cargamos las Zonas 
    this.Zonas = Array.from({ length: 3 }, (_, i) => ({
      name: (i + 1).toString(), // Lo que se ve en el combo: "1", "2", "3"
      value: i + 1             // Lo que se guarda: 1, 2, 3 (tipo number)
    }));

    // Cargamos los Asesores 
    this.principalService.obtenerAsesores().subscribe(
      (response: ApiResponse<{ asesores: asesores[] }>) => {


        if (response.isExitoso && response.resultado?.asesores) {
          this.Asesores = response.resultado.asesores.map(asesor => ({
            label: asesor.nombreAsesor,
            value: asesor.codigoAsesor
          }));


        } else {
          this.Asesores = [];
          console.warn('No se recibieron asesores o la respuesta no fue exitosa');
        }
      },
      (error) => {
        this.Asesores = [];
        console.error('Error al obtener asesores:', error);
      }
    );

    // cargamos la OT buscada anteriormente si existe 
    const estado = this.servicioCompartido.obtenerEstadoOT();
      if (estado) {
        this.formOT.patchValue({ OT: estado.ot, Pedido: estado.pedidoSeleccionado });
        this.pedidos = estado.pedidos;
        this.cambioPedido(estado.pedidoSeleccionado);
      }

  }

 

  CargarPedidos() {

    // Se captura el valor digitado de la OT
    const ot = this.formOT.value.OT;

    this.formOT.reset();
    this.formOT.patchValue({ OT: ot }); // Mantiene el valor de OT

    if (ot) {
      this.principalService.obtenerPedidos(ot).subscribe(
        (response: ApiResponse<Pedidos[]>) => {
          if (response.isExitoso) {
            //  Extraemos `resultado` 
            this.pedidos = response.resultado || [];
            const ultimoPedido = this.pedidos[this.pedidos.length - 1];

            //  Asigna automáticamente el último pedido al formulario
            this.formOT.patchValue({ Pedido: ultimoPedido });

            this.cambioPedido(ultimoPedido);


            // guardamos ot 
            this.servicioCompartido.guardarEstadoOT({
              ot,
              pedidoSeleccionado: ultimoPedido,
              pedidos: [...this.pedidos]
            });

            this.servicioCompartido.mostrarAlerta('Pedidos actualizados', "success");
          } else {
            this.pedidos = [];
            this.servicioCompartido.mostrarAlerta(response.mensaje, "error");
            this.botonOkControl = true;
            this.reporteContable = [];
            this.fechasDespacho = [];
            this.ordenCerrada = false;
            this.servicioCompartido.limpiarEstadoOT();
          }
        },
        (error) => {
          this.pedidos = [];
          this.servicioCompartido.mostrarAlerta(error.error?.mensaje || "Error al obtener pedidos", "error");
          this.botonOkControl = true;
          this.reporteContable = [];
          this.fechasDespacho = [];
          this.ordenCerrada = false;
          this.servicioCompartido.limpiarEstadoOT();
        }
      );
    } else {
      this.pedidos = [];
      this.servicioCompartido.mostrarAlerta("Por favor, digite una OT");
      this.botonOkControl = true;
      this.reporteContable = [];
      this.fechasDespacho = [];
      this.ordenCerrada = false;
      this.servicioCompartido.limpiarEstadoOT();
    }
  }


  cambioPedido(pedidoSeleccionado: Pedidos) {

    if (!pedidoSeleccionado) return;

    //  llamamos al servicio para obtener informacion de la ot 
    this.principalService.obtenerInfoPedido(this.formOT.value.OT, pedidoSeleccionado.consecutivoPedido)
      .subscribe(response => {
        if (!response.isExitoso) return;

        const datos = response.resultado;
        const infoOT = datos.infoOT;
        const infoCliente = datos.infoCliente;
        const plano = datos.plano;

        // Buscamos los códigos de sede
        const codigoSedeInst = this.sedes.find(s => s.descripcionSede === infoOT.instaladaPor?.toUpperCase())?.codigoSede ?? null;
        const codigoSedeFab = this.sedes.find(s => s.descripcionSede === infoOT.fabricadoPor?.toUpperCase())?.codigoSede ?? null;

        // Asignamos valores al formulario
        this.formOT.patchValue({
          // Info OT
          TipoPed: infoOT.descripcion_TipoPedido,
          Direccion: infoOT.direccion,
          Ciudad: infoOT.ciudad,
          Dpto: infoOT.region,
          Pais: infoOT.pais,
          Obra: infoOT.nombreObra,
          Contacto: infoOT.personaReceptora,
          Mail: infoOT.mailContacto,
          Base: infoOT.pedidoBase,
          chkActaEntrega: infoOT.actaEntrega,
          Telefono: infoOT.telefono,
          Celular: infoOT.celular,
          Recibe: infoOT.recibePedido,
          ObsOT: infoOT.observacionPedido,

          // Fechas
          fechaVenta: infoOT.fechaConfirmacionVenta ? new Date(infoOT.fechaConfirmacionVenta) : null,
          fechaOkVenta: infoOT.fechaEntregaDibujoDespiece ? new Date(infoOT.fechaEntregaDibujoDespiece) : null,
          fechaOkDibujo: infoOT.fechaEntregaProduccion ? new Date(infoOT.fechaEntregaProduccion) : null,
          fechaEmpVenta: infoOT.fechaEmpaqueVenta ? new Date(infoOT.fechaEmpaqueVenta) : null,
          fechaOkEmp: infoOT.fechaTerminadaEmpaque ? new Date(infoOT.fechaTerminadaEmpaque) : null,
          fechaEmpProd: infoOT.fechaEmpaque ? new Date(infoOT.fechaEmpaque) : null,
          fechaOkDesp: infoOT.fechaTerminadaDespacho ? new Date(infoOT.fechaTerminadaDespacho) : null,
          fechaHabProducir: infoOT.fechaHabilitadaProducir ? new Date(infoOT.fechaHabilitadaProducir) : null,
          fechaInstalacion: infoOT.fechaInstalacion ? new Date(infoOT.fechaInstalacion) : null,
          fechaOkInsta: infoOT.fechaFinalInstalacion ? new Date(infoOT.fechaFinalInstalacion) : null,
          fechaOkFactura: infoOT.fechaFactura ? new Date(infoOT.fechaFactura) : null,

          // Extras
          Plano: plano?.plano ?? '',
          RespFact: infoOT.responsableFacturacion,
          Supervisor: infoOT.supervisor,
          DiasInsta: infoOT.diasIntalacion,
          Instala: codigoSedeInst,
          FabPor: codigoSedeFab,

          // Cliente
          Nit: infoCliente.nit,
          NombreCliente: infoCliente.razonSocial,
          ContactoCliente: infoCliente.nombreContacto,
          DireccionCliente: infoCliente.direccion,
          Municipio: infoCliente.ciudad,
          TelefonoCliente: infoCliente.telefono,

          // Contabilidad y Venta
          ObsContable: infoOT.observacionesContables,
          Zona: Number(infoOT.zona),
          FormaPago: infoOT.formaPago,
          asesor: infoOT.codigoAsesor,
          CedulaAsesor: infoOT.codigoAsesor,
          Cotizacion: infoOT.cotizacion,
          Comision: infoOT.descuentoComision,
          Venta: infoOT.precioVenta,
          PorcentajeDescuento: infoOT.descuento,
          Descuento: (infoOT.precioVenta * infoOT.descuento) / 100,
          Vtte: infoOT.valorTteVia,
          Viatico: infoOT.valorViatico,
          Total: infoOT.precioVenta - ((infoOT.precioVenta * infoOT.descuento) / 100) + infoOT.valorTteVia + infoOT.valorViatico,

          // Facturación
          chkProblemaFact: !!infoOT.noFactura,
          RazonFactura: infoOT.razonNoFactura
        });

        // Tablas de  Fechas y contable 
        this.fechasDespacho = [...(datos.fechaDespacho ?? [])];
        this.reporteContable = [...(datos.reporteContable ?? [])];

        // Estado de la tabla 
        this.modoSoloTabla = true;

        // Control botón OK (solo para Producción) aqui se debe hacer el switch por departamento
        this.botonOkControl = !(infoOT?.terminadoDiseño === true && infoOT?.terminadoProduccion === false);

        //Control de botones 
        // Variable para Estado Botones para produccion
        this.botones = {
          nuevaOT: true,
          guardar: true,
          modificarOT: datos.infoOT.terminadoDiseño ? false : true,
          eliminarOT: datos.infoOT.terminadoDiseño ? false : true,
          observaciones: false,
          imprimirOT: false,
          imprimirContable: true,
          cancelar: true,
          visualizarOT: false,
          importarOT: false,
          detenerProduccion: false, // Validar color depende de estado PararProduccion
          detenerDespacho: false,  // Validar color depende de estado PararDespacho
          registrarPedido: true,
          abrirCerrarObra: true, // Validar color depende de estado cerrada
          obraReactivada: false, // Validar color depende de estado reactivada
          programarObras: datos.infoOT.terminadoDiseño ? false : true,
          anularObra: datos.infoOT.anulada ? false : true, // revisar el color depende del campo Anulada
          trojaProceso: datos.infoOT.terminadoDiseño ? false : true, // Validar color depende de estado terminadaTroja
          actaEntrega: true
        };

        // si la ot esta cerrada  se muestra el label 
        this.ordenCerrada = datos.infoOT.cerrada;

        // Actualizamos el estado de la ot 
        const ot = this.formOT.value.OT;
        if (ot && pedidoSeleccionado) {
          this.servicioCompartido.guardarEstadoOT({
            ot,
            pedidoSeleccionado,
            pedidos: [...this.pedidos]
         
          });
        }
        

      });

  }

  activarModoTabla() {
    this.modoSoloTabla = false;
  }

  desactivarModoTabla() {
    this.modoSoloTabla = true;
  }

  onExpandirObsOT(): void {
    this.obserControl = !this.obserControl;
  }

  alternarPosicionOT(): void {
    this.posicionArriba = !this.posicionArriba;
  }

  ModificarOT() {
    this.servicioCompartido.mostrarAlerta("Modificar OT", "success");
  }
  
  EliminarOT() {
    this.servicioCompartido.mostrarAlerta("Eliminar OT", "warn");
  }
  
  VerObservaciones() {
    this.servicioCompartido.mostrarAlerta("Observaciones de la OT", "info");
  }
  
  ImprimirInfoOT() {
    this.servicioCompartido.mostrarAlerta("Imprimir información de la OT", "info");
  }
  
  ImprimirInfoOTContable() {
    this.servicioCompartido.mostrarAlerta("Imprimir información contable", "info");
  }
  
  Cancelar() {
    this.servicioCompartido.mostrarAlerta("Operación cancelada", "warn");
  }
  
  VisualizarOts() {
    this.servicioCompartido.mostrarAlerta("Visualizar OT", "info");
  }
  
  ImportarOTs() {
    this.servicioCompartido.mostrarAlerta("Importar OTs", "info");
  }
  
  DetenerProduccion() {
    this.servicioCompartido.mostrarAlerta("Producción detenida", "warn");
  }
  
  DetenerDespacho() {
    this.servicioCompartido.mostrarAlerta("Despacho detenido", "warn");
  }
  
  RegistrarPedido() {
    this.servicioCompartido.mostrarAlerta("Registrar nuevo pedido", "success");
  }
  
  AbrirCerrarOt() {
    this.servicioCompartido.mostrarAlerta("Abrir / Cerrar obra", "warn");
  }
  
  ObraNoReactivada() {
    this.servicioCompartido.mostrarAlerta("Obra no reactivada", "info");
  }
  
  ProgramarObra() {
    this.servicioCompartido.mostrarAlerta("Programar obra", "success");
  }
  
  AnularObra() {
    this.servicioCompartido.mostrarAlerta("Obra anulada", "error");
  }
  
  TrojaProceso() {
    this.servicioCompartido.mostrarAlerta("Troja en proceso", "info");
  }
  
  ActaEntrega() {
    this.servicioCompartido.mostrarAlerta("Acta de entrega generada", "success");
  }
  
  
}
