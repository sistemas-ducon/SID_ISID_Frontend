import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { ModulosMedidasFinales, MedidasCorteProduccion } from '../../../../models/isid/OrdenTrabajo/produccion.dto';


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
    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (pedido) {
        const nuevoIdOT = pedido.idOT;
        const nuevoConsecutivo = pedido.consecutivoPedido?.toString();

        if (!nuevoIdOT) return;

        if (this.idOT !== nuevoIdOT || this.consecutivoPedido !== nuevoConsecutivo) {
          this.idOT = nuevoIdOT;
          this.consecutivoPedido = nuevoConsecutivo;
          this.cargarDatos();
        }
      } else {
        this.limpiarDatos();
      }
    });
  }

  cargarDatos() {
    if (this.idOT && this.consecutivoPedido) {
  
      this.ordenTrabajoService.obtenerReporteModulosMedidas(this.idOT, this.consecutivoPedido).subscribe({
        next: (response) => {

  
          if (response.isExitoso) {
            let data = response.resultado;

  
            // Ajuste de las propiedades para que coincidan con el tipo esperado
            data = {
              medidasCorteProduccion: data.medidasCorteProduccion,
              modulosMedidasFinales: data.modulosMedidasFinales,
            };
            // Asignando los datos correctamente
            this.medidasCorteProduccion = data?.medidasCorteProduccion || [];
            this.modulosMedidasFinales = data?.modulosMedidasFinales || [];

          } else {
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
  }
}
