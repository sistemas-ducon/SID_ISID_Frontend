import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';
import { ProveedorActualizarDto, ProveedorDto } from '../../../../models/isid/OrdenTrabajo/compras.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Programacion } from '../../../../models/isid/OrdenTrabajo/consultas.dto';

@Component({
  selector: 'app-reprogramar-proceso',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule, ReactiveFormsModule],
  templateUrl: './reprogramar-proceso.component.html',
  styleUrl: './reprogramar-proceso.component.css'
})
export class ReprogramarProcesoComponent implements OnChanges{
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() ot: string = '';   // Definir como Input
  @Input() pedido: number = 0; // Definir como Input

  countries: any[] | undefined;
  selectedCountry: any;

  showDialog: boolean = false;
  mostrarValores: boolean = false;
valorPedido: string = '';
valorProcesar: string = '';
fecha1: string = '';
fecha2: string = '';
  reprogramaciones: Programacion[] = [];

constructor(private ordenTrabajoService: OrdenTrabajoService) {}

recibirDatos(ot: string, pedido: number): void {

          // Llamada al servicio para obtener los operarios
          this.ordenTrabajoService.obtenerOperariosProduccion().subscribe((data) => {
            this.countries = data.resultado; // Asigna los operarios al dropdown
          });


  this.ot = ot;
  this.pedido = pedido;

  this.ordenTrabajoService.consultarReprogramaciones(this.ot, this.pedido).subscribe({
    next: (res: any) => {
      this.reprogramaciones = res.resultado; // ✅ Aquí está el arreglo correcto
    },
    error: (err) => {
      console.error('Error al consultar reprogramaciones:', err);
    }
  });

  
  
}



// Detecta los cambios en los Inputs
ngOnChanges(changes: SimpleChanges): void {
  if (changes['ot']) {
    console.log('OT cambiada:', this.ot);
  }
  if (changes['pedido']) {
    console.log('Pedido cambiado:', this.pedido);
  }

  const hoy = new Date();
  const hoySinHora = hoy.toISOString().split('T')[0];
  const mas7Dias = new Date(hoy);
  mas7Dias.setDate(hoy.getDate() + 7);
  const mas7SinHora = mas7Dias.toISOString().split('T')[0];

  this.fecha1 = hoySinHora;
  this.fecha2 = mas7SinHora;
  
}

// Método de cierre
cerrar() {
  this.onClose.emit();
}

  
}
