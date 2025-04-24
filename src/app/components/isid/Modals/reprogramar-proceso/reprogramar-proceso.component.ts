import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';
import { ProveedorActualizarDto, ProveedorDto } from '../../../../models/isid/OrdenTrabajo/compras.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reprogramar-proceso',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule, ReactiveFormsModule],
  templateUrl: './reprogramar-proceso.component.html',
  styleUrl: './reprogramar-proceso.component.css'
})
export class ReprogramarProcesoComponent {
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  countries: any[] | undefined;
  selectedCountry: any;

  showDialog: boolean = false;
  mostrarValores: boolean = false;
valorPedido: string = '';
valorProcesar: string = '';
fecha1: string = '';
fecha2: string = '';

   constructor() {}

ngOnInit() {
   const hoy = new Date();
  const hoySinHora = hoy.toISOString().split('T')[0];
  const mas7Dias = new Date(hoy);
  mas7Dias.setDate(hoy.getDate() + 7);
  const mas7SinHora = mas7Dias.toISOString().split('T')[0];

  this.fecha1 = hoySinHora;
  this.fecha2 = mas7SinHora;
  
}



  cerrar() {
    this.onClose.emit();
  }
  
}
