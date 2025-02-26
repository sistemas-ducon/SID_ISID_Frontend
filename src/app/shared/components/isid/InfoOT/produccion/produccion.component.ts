import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService, InfoPedido } from '../../../../../services/isid/orden-trabajo.service';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css',
})
export class ProduccionComponent implements OnInit{
  modulosMedidasFinales: any[] = [];
  medidasCorteProduccion: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedModulo: any;
  selectedMedidas: any;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService,
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
          this.modulosMedidasFinales = data.modulosMedidasFinales;
          this.medidasCorteProduccion = data.medidasCorteProduccion;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    }
  }
}
