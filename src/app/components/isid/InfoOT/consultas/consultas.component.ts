import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { Proceso } from '../../../../models/isid/OrdenTrabajo/proceso.dto';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { AuthService } from '../../../../services/login/auth.services.ts.service';
import { SessionServiceService } from '../../../../services/login/guardarsesion/session-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { ReprogramarProcesoComponent } from '../../Modals/reprogramar-proceso/reprogramar-proceso.component';
import { DialogObservacionesComponent } from '../../Modals/observaciones/dialog-observaciones/dialog-observaciones.component';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [FormsModule, DropdownModule, FloatLabelModule, ...PRIME_NG_IMPORTS, InputTextModule, CommonModule,
     TriStateCheckboxModule, InputTextareaModule, ReprogramarProcesoComponent, DialogObservacionesComponent],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css'
})
export class ConsultasComponent{
  countries: any[] | undefined;
  value: string | undefined;

  selectedCountry: any;
  procesos: any[] = [];
  selectedItem: any;
  otBuscar: string = '';
  nombreObraBuscar: string = '';
  todasProgramadas: boolean = false;
  impresion: boolean = true;
  modalVisibleReprogramar: boolean = false;
  modalVisibleObservaciones: boolean = false;

  fecha1: string = '';
  fecha2: string = '';

  camposDeshabilitados: boolean = true; 
  textAreaDeshabilitados: boolean = true; 
  botonesDeshabilitados: boolean = true; 


   constructor(private ordenTrabajoService: OrdenTrabajoService, private authService: AuthService, private SessionServiceService: SessionServiceService,   private router: Router,  private route: ActivatedRoute,
    private infoOtStateService: InfoOtStateService) {}

  ngOnInit() {
    const usuario = this.SessionServiceService.obtenerSesion();
    if (usuario && usuario.cedula) {
      this.obtenerProcesos(usuario.cedula);
    }    

    const hoy = new Date();
    const hoySinHora = hoy.toISOString().split('T')[0];
    const mas7Dias = new Date(hoy);
    mas7Dias.setDate(hoy.getDate() + 7);
    const mas7SinHora = mas7Dias.toISOString().split('T')[0];

    this.fecha1 = hoySinHora;
    this.fecha2 = mas7SinHora;
    
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

  seleccionarOTyPedido(modulo: any): void {
    const ot: string = modulo.ot;
    const pedido: string = modulo.pedido;
  
    if (ot && pedido) {
      // Actualizar el servicio con los valores seleccionados
      this.infoOtStateService.setIdOT(ot);  // Establece la OT seleccionada
      this.infoOtStateService.setSelectedPedido({ consecutivoPedido: Number(pedido) });

      this.router.navigate(['../info.ot'], { relativeTo: this.route });

    } else {
      console.warn('⚠️ No se seleccionó una OT o un pedido válido');
    }
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
  
  onRowSelect(): void {
    this.botonesDeshabilitados = false;
  }

  habilitarObservacionAdicional(): void {
    this.textAreaDeshabilitados = !this.textAreaDeshabilitados;
  }

  abrirModalReprogramar(): void {
    this.modalVisibleReprogramar = true;
  }

  abrirModalObservacion(): void {
    this.modalVisibleObservaciones = true;
  }

  hideDialog() {
    this.modalVisibleReprogramar = false;
  }
}
