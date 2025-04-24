import { Component, OnInit } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { Compra } from '../../../../models/isid/OrdenTrabajo/compras.dto';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { ComprasProveedorComponent } from '../../Modals/compras-proveedor/compras-proveedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, ComprasProveedorComponent, ReactiveFormsModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit{
  compras: Compra[] = [];
  
  idOT!: string;
  consecutivoPedido!: string;
  modalVisibleProveedores = false;

  IdSeleccionado: any = null;

  formSuperior!: FormGroup;
  formInferior!: FormGroup;

  bodega: any[] = [
    { bodega: '01' },
    { bodega: '01' },
    { bodega: '01' },
    { bodega: '02' },
    { bodega: '02' },
    { bodega: '04' },
    { bodega: '10' }
  ];
 
  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService, private fb: FormBuilder
  ) {
    this.formInferior = this.fb.group({
      bodega: ['01']  // Valor predeterminado
    });
  }

  ngOnInit(): void {
    // Inicializar formulario superior
    this.formSuperior = this.fb.group({
      DCompras: [''],
      valorUnidad: [''],        // 👈 nombre correcto
      codigoInventario: [''],   // 👈 nombre correcto
      comprado: [''],
      PulidoBrillado: ['']       
    });
  
    // Inicializar formulario inferior
    this.formInferior = this.fb.group({
      Tercero: [''],
      NombreCom: [''],
      bodega: ['']  // Asegúrate de tener este campo en el formulario
    });
  
  
  
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
          this.obtenerCompras(); // Llamar al servicio cuando los datos estén listos
        }
      }
    });
  }
  

  obtenerCompras() {
    if (!this.idOT || !this.consecutivoPedido) return;
  
    this.ordenTrabajoService.obtenerCompras(this.idOT, this.consecutivoPedido).subscribe({
      next: (response) => {
        this.compras = response.resultado.compras; 
      },
      error: (error) => {
        console.error('Error al obtener compras:', error);
      }
    });
    
  }
  

  showDialogProveedores() {
    this.modalVisibleProveedores = true;
  }
  cargarFormulario(data: any) {
    this.formSuperior.patchValue({
      DCompras: data.descripcion,
      valorUnidad: data.valorUnidad,
      codigoInventario: data.codigoInventario,
      comprado: data.PulidoBrillado
    });
  }
  

  // Este método será llamado desde el modal hijo
  cargarInferiorDesdeModal(datos: any) {
    this.formInferior.patchValue({
      Tercero: datos.descripcion,
      NombreCom: datos.otroDato
    });
  }

  cargarFormularioDesdeModal(proveedor: any) {
    this.formInferior.patchValue({
      Tercero: proveedor.id_Proveedor,
      NombreCom: proveedor.nombreCompania,
    });
  }
  
  
  
}
