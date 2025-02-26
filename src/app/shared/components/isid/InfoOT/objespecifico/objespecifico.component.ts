import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService, InfoPedido } from '../../../../../services/isid/orden-trabajo.service';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';

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
