import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';

@Component({
  selector: 'app-insumosplano',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './insumosplano.component.html',
  styleUrl: './insumosplano.component.css'
})
export class InsumosplanoComponent implements OnInit {
  insumosPlano: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedInsumo: any;


  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
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
          this.insumosPlano = data.insumosPlano;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    }
  }
}
