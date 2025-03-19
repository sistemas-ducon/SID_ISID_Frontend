import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { DespiecePlano } from '../../../../models/isid/OrdenTrabajo/despiece.dto';
import { ChangeDetectorRef } from '@angular/core'; // 🔹 Importar ChangeDetectorRef

@Component({
  selector: 'app-despiece',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './despiece.component.html',
  styleUrl: './despiece.component.css'
})
export class DespieceComponent implements OnInit {
  insumosPlano: any[] = [];
  idOT: string = '';
  consecutivoPedido: string = '';
  selectedInsumo: any;
  DespiecePlano: DespiecePlano[] = [];

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService,
    private cdr: ChangeDetectorRef // 🔹 Inyectar ChangeDetectorRef
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
      this.ordenTrabajoService.obtenerInfoPedido(this.idOT, this.consecutivoPedido).subscribe({
        next: (data: InfoPedido) => {
          console.log('Datos recibidos:', data); // 👀 Verifica los datos recibidos
  
          if (data && 'despiecePlano' in data) {
            this.DespiecePlano = Array.isArray(data.despiecePlano) ? [...data.despiecePlano] : [];
            console.log('Despiece cargado:', this.DespiecePlano);
          } else {
            console.warn('despiecePlano no está presente en la respuesta:', data);
            this.DespiecePlano = [];
          }
  
          this.cdr.detectChanges(); // 🔥 Forzar actualización de la vista
        },
        error: () => this.limpiarDatos(),
      });
    }
  }

  limpiarDatos() {
    this.consecutivoPedido = '';
    this.DespiecePlano = [];
  }
}
