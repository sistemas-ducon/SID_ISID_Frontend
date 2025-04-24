import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { AuthService } from '../../../../services/login/auth.services.ts.service';
import { Proceso } from '../../../../models/isid/OrdenTrabajo/proceso.dto';
import { TableModule } from 'primeng/table';
import { SessionServiceService } from '../../../../services/login/guardarsesion/session-service.service';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';

@Component({
  selector: 'app-modal-programacion-ot',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, DialogModule, CommonModule, FloatLabelModule, FormsModule, DropdownModule, InputTextModule, TabMenuModule, RouterModule, ReactiveFormsModule, CheckboxModule, TableModule],
  templateUrl: './modal-programacion-ot.component.html',
  styleUrl: './modal-programacion-ot.component.css'
})
export class ModalProgramacionOTComponent {
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() seleccionOTPedido = new EventEmitter<{ ot: string, pedido: string }>();
  countries: any[] = [];
  selectedCountry: any;
  selectedItem: any;
  reporte: any;
  otBuscar: string = '';
  nombreObraBuscar: string = '';
  todasProgramadas: boolean = false;
  impresion: boolean = false;


  obra: string | undefined;
  verPendientes: boolean = false;
  value: string | undefined;

  procesos: any[] = [];

  constructor(private ordenTrabajoService: OrdenTrabajoService, private authService: AuthService, private SessionServiceService: SessionServiceService) {}

  ngOnInit(): void {
    const usuario = this.SessionServiceService.obtenerSesion();
    if (usuario && usuario.cedula) {
      this.obtenerProcesos(usuario.cedula);
    }    
   
  }

  obtenerProcesos(cedula: string): void {
    this.ordenTrabajoService.obtenerProcesosProduccion(cedula).subscribe(response => {
      this.countries = response.procesos.map((proceso: Proceso) => ({
        name: proceso.descripcionProceso,
        value: proceso.idArea
      }));      
    }, error => {
      console.error('Error al obtener procesos:', error);
    });
  }
  closeModal() {
    this.visible = false;
    this.onClose.emit();
  }
  
  consultar() {
  
    if (!this.selectedCountry || !this.selectedCountry.name) {
      console.warn('Debe seleccionar un proceso antes de consultar.');
      return;
    }
  
    const otBuscarValue = this.otBuscar?.trim() || '';
    const nombreObraValue = this.nombreObraBuscar?.trim() || '';
  
    this.ordenTrabajoService.obtenerReporte(
      this.selectedCountry.name,
      otBuscarValue,
      nombreObraValue,
      this.impresion,
      this.todasProgramadas
    ).subscribe(
      (response) => {
        this.procesos = response.progamacionProceso.flatMap((pp: { procesos: any[] }) =>
          pp.procesos.map(proceso => ({
            turno: proceso.turno,
            idProgramacion: proceso.idProgramacion,
            ot: proceso.ot,
            pedido: proceso.pedido,
            nombreObra: proceso.procesoDestino 
                        ? `${proceso.procesoDestino} - ${proceso.nombreObra}` 
                        : proceso.nombreObra,
            fechaInicioProceso: proceso.fechaInicioProceso,
            fechaFinalProceso: proceso.fechaFinalProceso,
            terminada: proceso.terminada,
            operario: proceso.operario,
            descripcionTipoPedido: proceso.descripcionTipoPedido,
            dias: proceso.dias,
            procesar: proceso.procesar,
            cantidad: proceso.cantidad,
            responsable: proceso.responsable,
            impresa: proceso.impresa,
            impresaPor: proceso.impresaPor,
            fechaImpresionReporte: proceso.fechaImpresionReporte,
            terminadaPor: proceso.terminadaPor,
            fechaRealFinalProceso: proceso.fechaRealFinalProceso,
            iniciado: proceso.iniciado,
            fechaRealInicio: proceso.fechaRealInicio,
            prioritario: proceso.prioritario
          }))
        );
      },
      (error) => {
        console.error('Error al obtener el reporte', error);
      }
    );
  }
  


  getBackgroundColor(modulo: any, column: string): string {
    if (!modulo) return 'transparent';
  
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalizar la fecha
  
    if (column === 'inicio') {
      if (!modulo.fechaInicioProceso) return 'transparent';
  
      let fechaInicio: Date;
      
      // Convertir a Date si es string
      if (typeof modulo.fechaInicioProceso === "string") {
        const partes = modulo.fechaInicioProceso.split(/[\s/:]/);
        fechaInicio = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T${partes[3] || "00"}:${partes[4] || "00"}:00`);
      } else {
        fechaInicio = new Date(modulo.fechaInicioProceso);
      }
  

  
      const horaInicio = fechaInicio.getHours();
      fechaInicio.setHours(0, 0, 0, 0); // Normalizar
  
      if (horaInicio === 23) return 'rgb(243 198 122)';
  
      // 📆 Comparar con la fecha actual
      if (fechaInicio < now) {
        // 🔵 Regla 2: Si ya pasó la fecha de inicio
        if (!modulo.iniciado) {
          return 'rgb(243 198 122)'; // 🟠 Naranja (#FFA500) - Si no está iniciado
        }
        return 'rgb(101 223 188)'; // Verde si está iniciado
      } else {
        // 🟢 Regla 3: Si la fecha aún no ha llegado pero está iniciado
        if (modulo.iniciado) return 'rgb(101 223 188)';
      }
    }

    if (column === 'final') {
      if (!modulo.fechaFinalProceso) return 'transparent';
  

  
      let fechaFinal: Date;
      
      if (typeof modulo.fechaFinalProceso === "string") {
        const partes = modulo.fechaFinalProceso.split(/[\s/:]/);
        fechaFinal = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T${partes[3] || "00"}:${partes[4] || "00"}:00`);
      } else {
        fechaFinal = new Date(modulo.fechaFinalProceso);
      }
  

      
      fechaFinal.setHours(0, 0, 0, 0); // Normalizar la fecha
  
  
      if (fechaFinal < now) {
        return '#ef8181'; // Rojo si la fecha ya pasó
      }
    }
  
    return 'transparent';
  }
  
  seleccionarOTyPedido(modulo: any) {
    const ot = modulo.ot;
    const pedido = modulo.pedido;

    // Emitir evento con los valores seleccionados
    this.seleccionOTPedido.emit({ ot, pedido });

    // Cerrar modal
    this.closeModal();
  }
}
