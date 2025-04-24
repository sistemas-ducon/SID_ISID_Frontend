import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { ModulosMedidasFinales, MedidasCorteProduccion } from '../../../../models/isid/OrdenTrabajo/produccion.dto';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';


@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css',
})
export class ProduccionComponent implements OnInit {
  modulosMedidasFinales: ModulosMedidasFinales[] = [];  
  medidasCorteProduccion: MedidasCorteProduccion[] = [];  
  idOT: string = '';
  consecutivoPedido: string = '';

  selectedModulo: any;
  selectedMedidas: any;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
  ) {}

  ngOnInit() {
    // Suscribirse al ID OT desde el servicio
    this.infoOtStateService.id_OT$.subscribe((idOT: string) => {
      this.idOT = idOT;
    });
  
    // Suscribirse al pedido seleccionado desde el servicio
    this.infoOtStateService.selectedPedido$.subscribe((pedido: Pedido | null) => {
      if (pedido && typeof pedido === 'object') {
        const nuevoConsecutivo = pedido.consecutivoPedido?.toString() || 'Consecutivo no definido';
  
  
        if (!this.idOT) {
          return;
        }
  
        // Actualizar datos solo si el ID OT o el consecutivo cambian
        if (this.idOT !== pedido.idOT || this.consecutivoPedido !== nuevoConsecutivo) {
          this.consecutivoPedido = nuevoConsecutivo;
          this.cargarDatos();
        }
      } else {
        console.warn('Pedido no encontrado o vacío.');
        this.limpiarDatos();
      }
    });
  }
  
  
  

  cargarDatos() {
    if (this.idOT && this.consecutivoPedido) {

      this.ordenTrabajoService.obtenerReporteModulosMedidas(this.idOT, this.consecutivoPedido).subscribe({
        next: (response) => {
        
  
          if (response.isExitoso) {
            const data = response.resultado;
  
            // Asignar directamente los datos a las tablas
            this.medidasCorteProduccion = data?.medidasCorteProduccion || [];
            this.modulosMedidasFinales = data?.modulosMedidasFinales || [];
  
          
          } else {
            console.warn('La respuesta no fue exitosa.');
            this.limpiarDatos();
          }
        },
        error: (err) => {
          console.error('Error al cargar los datos desde el servicio:', err);
          this.limpiarDatos();
        },
      });
    } else {
      console.warn('ID OT o consecutivo no proporcionado.');
    }
  }
  
  

  limpiarDatos() {
    this.consecutivoPedido = '';
    this.medidasCorteProduccion = [];
    this.modulosMedidasFinales = [];
  }
  
}
