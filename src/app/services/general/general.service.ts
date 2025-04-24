import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Pedidos } from '../../models/general/general';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  // Variable para guardar datos para cargar la OT (NumeroOT, Pedido Seleccionado, Lista de Pedidos)
  private estadoOT: { ot: string; pedidoSeleccionado: Pedidos; pedidos: Pedidos[];} | null = null;

  constructor(private messageService: MessageService) { }

  // Servivio de mensaje notificacion (mensaje/tipo)
  mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'info' | 'warn' = 'error') {
    this.messageService.add({
      severity: tipo, // Tipo de mensaje (success para el chulito) 
      summary:tipo,
      detail: mensaje,
      life: 1200, // Tiempo de vida en milisegundos (3 segundos)

    });
  }

  // Guarda el estado de una OT (NumeroOT, Pedido Seleccionado, Lista de Pedidos)
  guardarEstadoOT(estado: { ot: string; pedidoSeleccionado: Pedidos; pedidos: Pedidos[] }) {
    this.estadoOT = estado;
  }
  
  // Obtenemos el estado de una OT (NumeroOT, Pedido Seleccionado, Lista de Pedidos)
  obtenerEstadoOT() {
    return this.estadoOT;
  }
  
  // Limpiamos el estado de una OT (NumeroOT, Pedido Seleccionado, Lista de Pedidos)
  limpiarEstadoOT() {
    this.estadoOT = null;
  }





}
