import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root' // Disponible en toda la app
})
export class InfoOtStateService {
  private id_OT = new BehaviorSubject<string>('');
  private selectedPedido = new BehaviorSubject<any>(null);
  private pedidos = new BehaviorSubject<any[]>([]);
  private formData = new BehaviorSubject<FormGroup | null>(null); // Guardamos el FormGroup
  private programacionObra = new BehaviorSubject<any[]>([]);
  private fechaDespacho = new BehaviorSubject<any[]>([]);
  private plano = new BehaviorSubject<string>('');

  id_OT$ = this.id_OT.asObservable();
  selectedPedido$ = this.selectedPedido.asObservable();
  pedidos$ = this.pedidos.asObservable();
  formData$ = this.formData.asObservable(); // Observar cambios en el formulario
  programacionObra$ = this.programacionObra.asObservable();
  fechaDespacho$ = this.fechaDespacho.asObservable();
  plano$ = this.plano.asObservable();

  setPlano(plano: string) {
    this.plano.next(plano);
  }

  setIdOT(id: string) {
    this.id_OT.next(id);
  }
  
  setSelectedPedido(pedido: any) {
    this.selectedPedido.next(pedido);
  }
  

  setPedidos(pedidos: any[]) {
    this.pedidos.next(pedidos);
  }

  setFormData(data: FormGroup) { // Ahora manejamos el formulario de tipo FormGroup
    this.formData.next(data);
  }

  // Métodos para manejar otras propiedades
  setProgramacionObra(data: any[]) {
    this.programacionObra.next(data);
  }

  setFechaDespacho(data: any[]) {
    this.fechaDespacho.next(data);
  }

  getIdOT(): string {
    return this.id_OT.getValue();
  }
}
