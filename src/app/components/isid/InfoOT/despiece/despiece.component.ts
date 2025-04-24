import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { DespiecePlano } from '../../../../models/isid/OrdenTrabajo/despiece.dto';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';

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
  despiecePlano: DespiecePlano[] = []; // 🔹 Nombre de variable en minúscula para mantener buenas prácticas

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Obtener el ID OT directamente desde el servicio
    this.infoOtStateService.id_OT$.subscribe((idOT: string) => {
   
      this.idOT = idOT;
    });
  
    // Obtener el pedido seleccionado desde el servicio
    this.infoOtStateService.selectedPedido$.subscribe((pedido: Pedido | null) => {
 
  
      if (pedido && typeof pedido === 'object') {
        const nuevoConsecutivo = pedido.consecutivoPedido !== undefined ? pedido.consecutivoPedido.toString() : 'Consecutivo no definido';
  
    
  
        if (this.idOT === '' || this.idOT === 'ID OT no definido') {
          console.warn('El nuevo ID OT es indefinido o vacío.');
          return;
        }
  
        if (this.idOT !== pedido.idOT || this.consecutivoPedido !== nuevoConsecutivo) {
     
          this.consecutivoPedido = nuevoConsecutivo;
          this.cargarDatos();
        }
      } else {
        console.warn('Pedido no encontrado o vacío.');
        this.limpiarDatos();
      }
    });
  }
  
  cargarDatos() {
    if (this.idOT && this.consecutivoPedido) {
      this.ordenTrabajoService.ObtenerDespiecePlano(this.idOT, this.consecutivoPedido).subscribe({
        next: (response) => {
          console.log('Respuesta obtenida del despiece:', response); // Para verificar la estructura de la respuesta
  
          // Verificar si la respuesta es exitosa y tiene el formato esperado
          if (response?.isExitoso && response.resultado?.despiecePlano) {
            this.despiecePlano = response.resultado.despiecePlano;
          } else {
            console.error('Error al obtener el despiece plano:', response?.mensaje || 'Estructura no esperada');
            this.despiecePlano = [];
          }
  
          this.cdr.detectChanges(); // 🔥 Forzar actualización de la vista
        },
        error: (error) => {
          console.error('Error al obtener el despiece:', error);
          this.despiecePlano = [];
          this.limpiarDatos();
        },
      });
    }
  }
  
  

  limpiarDatos() {
    this.consecutivoPedido = '';
    this.despiecePlano = [];
    this.cdr.detectChanges(); // 🔥 Asegurar actualización de vista
  }
}
