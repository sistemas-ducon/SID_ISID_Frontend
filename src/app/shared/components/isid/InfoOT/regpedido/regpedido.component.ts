import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';
import { OrdenTrabajoService, InfoPedido } from '../../../../../services/isid/orden-trabajo.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-regpedido',
  standalone: true,
  imports: [TableModule, ButtonModule, FloatLabelModule, InputTextModule],
  templateUrl: './regpedido.component.html',
  styleUrl: './regpedido.component.css'
})
export class RegpedidoComponent implements OnInit{
  equivalencias: any[] = [];
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
          this.equivalencias = data.equivalenciaCodigosos;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    }
  }

}
