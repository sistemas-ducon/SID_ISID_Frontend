import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService, InfoPedido } from '../../../../../services/isid/orden-trabajo.service';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';


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
