import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';


@Component({
  selector: 'app-mo',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './mo.component.html',
  styleUrl: './mo.component.css'
})
export class MoComponent implements OnInit{
  insumosPlano: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedInsumo: any;


  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
  ) {}

  ngOnInit() {
    
  }

}
