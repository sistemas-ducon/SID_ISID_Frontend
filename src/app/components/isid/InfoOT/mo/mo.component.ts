import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { Mo, ProcesoMo } from '../../../../models/isid/OrdenTrabajo/mo.dto';

@Component({
  selector: 'app-mo',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './mo.component.html',
  styleUrl: './mo.component.css'
})
export class MoComponent implements OnInit {
  ManoObraConSubtotales: any[] = []; // Almacena los datos organizados con subtotales
  granTotal: number = 0;
  idOT: string = '';
  consecutivoPedido: string = '';

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
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
      this.ordenTrabajoService.obtenerManoObra(this.idOT, this.consecutivoPedido).subscribe({
        next: (response) => {

  
          // Verificar si la respuesta es exitosa y tiene el formato esperado
          if (response && response.isExitoso && response.resultado?.manoObra) {
            const moData: Mo[] = response.resultado.manoObra;
  
            // Aplanar procesos y asignar área de producción
            const procesos: ProcesoMo[] = moData.flatMap(mo =>
              mo.procesos.map(proceso => ({
                ...proceso,
                areaProduccion: mo.areaProduccion
              }))
            );
  
            // Calcular total general
            this.granTotal = procesos.reduce((total, proceso) => total + (proceso.subTotal ?? 0), 0);
  
            // Agrupar datos por área de producción con subtotales
            this.crearManoObraConSubtotales(procesos);
          } else {
            console.error('Error al obtener la mano de obra:', response?.mensaje || 'Estructura no esperada');
            this.limpiarDatos();
          }
        },
        error: (err) => {
          console.error('Error en la solicitud:', err);
          this.limpiarDatos();
        },
      });
    }
  }
  
  

  crearManoObraConSubtotales(procesos: ProcesoMo[]) {
    let procesosAgrupados: any = {};

    // Agrupar por área de producción
    procesos.forEach(proceso => {
      const area = proceso.areaProduccion ?? 'Sin Área Definida';
      if (!procesosAgrupados[area]) {
        procesosAgrupados[area] = { area, subtotal: 0, procesos: [] };
      }
      procesosAgrupados[area].procesos.push(proceso);
      procesosAgrupados[area].subtotal += proceso.subTotal ?? 0;
    });

    // Convertir a formato para la tabla
    this.ManoObraConSubtotales = [];
    Object.keys(procesosAgrupados).forEach(area => {
      const areaData = procesosAgrupados[area];
      this.ManoObraConSubtotales.push(...areaData.procesos);

      // Insertar fila de subtotal
      this.ManoObraConSubtotales.push({
        areaProduccion: area,
        subtotal: areaData.subtotal,
        isSubtotal: true
      });
    });
  }

  limpiarDatos() {
    this.consecutivoPedido = '';
    this.ManoObraConSubtotales = [];
    this.granTotal = 0;
  }
}
