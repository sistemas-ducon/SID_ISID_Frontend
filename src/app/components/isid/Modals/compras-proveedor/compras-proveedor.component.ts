import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';
import { ProveedorActualizarDto, ProveedorDto } from '../../../../models/isid/OrdenTrabajo/compras.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-compras-proveedor',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule, ReactiveFormsModule],
  templateUrl: './compras-proveedor.component.html',
  styleUrl: './compras-proveedor.component.css'
})
export class ComprasProveedorComponent implements OnInit{
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  @Output() proveedorSeleccionadoEvent = new EventEmitter<any>();

  proveedoresFiltrados: ProveedorDto[] = [];
  mensaje: string = '';

  showDialog: boolean = false;

  filtroTexto: string = '';

  proveedores: ProveedorDto[] = [];

formulario!: FormGroup;

proveedorSeleccionado: any = null;

idSeleccionado: number | null = null;

  constructor(private proveedorService: OrdenTrabajoService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
        nit: [{ value: '', disabled: true }],
        proveedor: [{ value: '', disabled: true}],
        mail: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }],
      contacto: [{ value: '', disabled: true }]
    })
  }

  
  ngOnInit(): void {
   this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.obtenerInfoProveedores().subscribe({
      next: (res) => {
        if (res.isExitoso) {
          this.proveedores = res.resultado;
          this.proveedoresFiltrados = res.resultado;
        } else {
          this.mensaje = res.mensaje;
        }
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al obtener los proveedores.';
      }
    });
  }
  

  cargarFormulario(proveedor: any) {
  
    this.formulario.patchValue({
      nit: proveedor.id_Proveedor ?? '',
      proveedor: proveedor.nombreCompania ?? '',
      mail: proveedor.correo_Electronico ?? '',
      telefono: proveedor.telefono ?? '',
      contacto: proveedor.nombreContacto ?? ''
    });
  
    this.formulario.disable();
  }
  
  enviarProveedor(event: any) {
    this.proveedorSeleccionadoEvent.emit(event.data);
    this.onClose.emit(); // cerrar modal
  }
  

  filtrarProveedores(): void {
    const texto = this.filtroTexto.toLowerCase();
  
    this.proveedoresFiltrados = this.proveedores.filter(p =>
      p.nombreCompania.toLowerCase().includes(texto) 

    );
  }

  activarFormulario(): void{
this.formulario.reset();
this.formulario.enable();
this.proveedorSeleccionado = null;
  }

  deshabilitarFormulario(): void{
this.formulario.disable();
  }

  modificarFormulario(proveedor: ProveedorDto | null): void {
    if (!proveedor) {
      this.mensaje = 'Debes seleccionar un proveedor para modificar.';
      return;
    }
  
    this.idSeleccionado = proveedor.id_ProveedorAuto;

  
    this.formulario.patchValue({
      nit: proveedor.id_Proveedor,
      proveedor: proveedor.nombreCompania,
      contacto: proveedor.nombreContacto,
      telefono: proveedor.teléfono,
      mail: proveedor.correo_Electronico
    });
  
    this.formulario.enable();
  }
  
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      this.showDialog = this.visible;
    }
  }

  cerrar() {
    this.showDialog = false;
    this.onClose.emit();
  }

  guardarProveedor(): void {
    if (this.formulario.invalid) {
      this.mensaje = 'Completa todos los campos obligatorios.';
      return;
    }
  
    const dto = {
      id_Proveedor: this.formulario.get('nit')?.value,
      nombreCompania: this.formulario.get('proveedor')?.value,
      nombreContacto: this.formulario.get('contacto')?.value,
      telefono: this.formulario.get('telefono')?.value,
      correo_Electronico: this.formulario.get('mail')?.value
    };
  
    if (this.idSeleccionado === null) {
      // INSERTAR
      this.proveedorService.insertarProveedor(dto).subscribe({
        next: (res) => {
          this.mensaje = res.mensaje;
          this.deshabilitarFormulario();
          this.cargarProveedores();
          this.formulario.reset();
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Error al guardar el proveedor.';
        }
      });
    } else {
  // ACTUALIZAR
const dtoActualizar: ProveedorActualizarDto = {
  ...dto,
  id_ProveedorAuto: this.idSeleccionado
};



this.proveedorService.actualizarProveedor(dtoActualizar).subscribe({
  next: (res) => {
    this.mensaje = res.mensaje;
    this.deshabilitarFormulario();
    this.cargarProveedores();
    this.formulario.reset();
    this.idSeleccionado = null;
  },
  error: (err: any) => {
    console.error('Error al actualizar proveedor:', err); // 👈 VERIFICACIÓN
    this.mensaje = 'Error al actualizar el proveedor.';
  }
});

    }
  }
  

}
