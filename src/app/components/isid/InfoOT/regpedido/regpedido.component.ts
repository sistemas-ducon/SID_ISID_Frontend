import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { equivalenciaDeCodigos } from '../../../../models/isid/OrdenTrabajo/equivalenciaDeCodigos.dto';

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

      this.ordenTrabajoService.obtenerEquivalenciaCodigos().subscribe({
        next: (data: equivalenciaDeCodigos) => {
          this.equivalencias = data.equivalenciaCodigosos;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    
  }

}
