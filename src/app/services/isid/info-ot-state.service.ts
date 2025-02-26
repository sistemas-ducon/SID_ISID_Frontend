import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponible en toda la app
})
export class InfoOtStateService {
  private id_OT = new BehaviorSubject<string>('');
  private selectedPedido = new BehaviorSubject<any>(null);
  private pedidos = new BehaviorSubject<any[]>([]);
  private formData = new BehaviorSubject<any>({}); // Guarda todos los datos
  private programacionObra = new BehaviorSubject<any[]>([]); 
  private fechaDespacho = new BehaviorSubject<any[]>([]); 

  id_OT$ = this.id_OT.asObservable();
  selectedPedido$ = this.selectedPedido.asObservable();
  pedidos$ = this.pedidos.asObservable();
  formData$ = this.formData.asObservable();
  programacionObra$ = this.programacionObra.asObservable(); 
  fechaDespacho$ = this.programacionObra.asObservable(); 

  setIdOT(id: string) {
    this.id_OT.next(id);
  }

  setSelectedPedido(pedido: any) {
    this.selectedPedido.next(pedido);
  }

  setPedidos(pedidos: any[]) {
    this.pedidos.next(pedidos);
  }

  setFormData(data: any) {
    this.formData.next(data);
  }

  // 🔹 Nuevo método para almacenar programacionObra
  setProgramacionObra(data: any[]) {
    this.programacionObra.next(data);
  }

  setFechaDespacho(data: any[]) {
    this.fechaDespacho.next(data);
  }
}
