import { Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { OrdenTrabajoService, InfoPedido } from '../../../../../services/isid/orden-trabajo.service';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';  
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../../core/services/login/auth.service';
import { FormsModule } from '@angular/forms';
import { FileRemoveEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-docprod',
  standalone: true,
  imports: [TableModule, CommonModule, FloatLabelModule, InputTextModule, RouterModule, FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, CommonModule, FormsModule],
  templateUrl: './docprod.component.html',
  styleUrl: './docprod.component.css',
  providers: [MessageService]
})
export class DocprodComponent  implements OnInit{
  documentacionPedido: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedModulo: any;
  selectedMedidas: any;
  observacion: string = '';

  files = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;


  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private authService: AuthService,
    private infoOtStateService: InfoOtStateService,
    private config: PrimeNGConfig, private messageService: MessageService
  ) {}

  ngOnInit() {
    
    // Suscribirse al ID de la OT y al pedido seleccionado
    this.infoOtStateService.id_OT$.subscribe(id => {
      this.idOT = id;
      this.cargarDatos();
    });

    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (pedido) {
        this.consecutivoPedido = pedido.consecutivoPedido.toString();
        this.cargarDatos();
      }
    });
    
  }
  

  cargarDatos() {
    if (this.idOT && this.consecutivoPedido) {
      this.ordenTrabajoService.obtenerInfoPedido(this.idOT, this.consecutivoPedido).subscribe({
        next: (data: InfoPedido) => {
          this.documentacionPedido = data.documentacionPedido;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    }
  }

  descargarArchivo(documento: any) {
    if (!documento.archivo) {
      console.warn("No hay archivo disponible para descargar.");
      return;
    }
  
    const usuarioActual = this.authService.usuarioActual;
    if (!usuarioActual) {
      console.error("No hay usuario autenticado.");
      return;
    }
  
    const nombreUsuario = usuarioActual.nombreUsuario;
    const OT = this.idOT || documento.pedido || documento.OT;
    const nombreArchivo = documento.archivo;
    const idDocumento = documento.idDocumento;
  
    this.ordenTrabajoService
      .descargarArchivo(OT, nombreArchivo, idDocumento, nombreUsuario)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = nombreArchivo;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error("Error al descargar el archivo", error);
        }
      });
  }
  

  

  onSelectedFiles(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Archivos seleccionados',
      detail: `${event.files.length} archivo(s) agregado(s) para subir.`
    });
  }

  onRemoveTemplatingFile(event: FileRemoveEvent, fileUploader: any) {
    this.totalSize -= fileUploader.files.reduce((acc: number, file: File) => acc + file.size, 0);
    this.totalSizePercent = this.totalSize / 10;
    this.messageService.add({
      severity: 'warn',
      summary: 'Archivo eliminado',
      detail: 'Se ha eliminado un archivo de la lista.'
    });
  }

 onFileUpload(event: any) {
  if (!this.idOT || !this.consecutivoPedido) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Faltan datos',
      detail: 'ID OT y Consecutivo de Pedido son requeridos.',
    });
    return;
  }

  if (!this.observacion || this.observacion.trim() === '') {
    this.messageService.add({
      severity: 'warn',
      summary: 'Observación requerida',
      detail: 'Debe ingresar una observación antes de subir el archivo.',
    });
    return;
  }

  const archivo = event.files[0]; // Obtiene el primer archivo seleccionado
  const usuario = this.authService.usuarioActual?.nombreUsuario || 'Usuario desconocido';

  this.ordenTrabajoService
    .subirArchivo(this.idOT, this.consecutivoPedido, archivo, this.observacion, usuario)
    .subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Archivo Subido',
          detail: response.datos,
        });

        this.cargarDatos();

        // **LIMPIAR EL INPUT DE ARCHIVOS DESPUÉS DE SUBIRLO**
        if (event && event.files) {
          event.files.length = 0; // Esto limpia la selección de archivos
        }

        // **LIMPIAR EL CAMPO OBSERVACIÓN DESPUÉS DE SUBIRLO**
        this.observacion = '';
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo subir el archivo.',
        });
        console.error('Error al subir archivo:', err);
      },
    });
}

}
