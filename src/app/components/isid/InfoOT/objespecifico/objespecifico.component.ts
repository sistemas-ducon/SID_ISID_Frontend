import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';

@Component({
  selector: 'app-objespecifico',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './objespecifico.component.html',
  styleUrl: './objespecifico.component.css'
})
export class ObjespecificoComponent implements OnInit{
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
    
  }
}
