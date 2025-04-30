import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogObservacionesComponent } from '../../Modals/observaciones/dialog-observaciones/dialog-observaciones.component';
import { ModalProgramacionOTComponent } from '../../Modals/modal-programacion-ot/modal-programacion-ot.component';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { FechaDespacho, InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

interface Consecutivo {
  name: string | null;
}

@Component({
  selector: 'app-info-ot',
  standalone: true,
  imports: [
    ...PRIME_NG_IMPORTS, CommonModule, RouterModule, DialogObservacionesComponent, ModalProgramacionOTComponent, ReactiveFormsModule
  ],
  templateUrl: './info-ot.component.html',
  styleUrl: './info-ot.component.css'
})
export class InfoOTComponent implements OnInit {
  id_OT: string = '';
  pedidos: Pedido[] = [];
  selectedPedido: Pedido | undefined;
  selectedCountry: Consecutivo | undefined = undefined;
  countries: Consecutivo[] = [];
  programacionObra: any[] = [];
  formData: any = {};
  isDisabled: boolean = true;
  modalVisible = false;
  modalVisibleProgramacion = false;
  formOT: FormGroup;

  fechaDespacho: FechaDespacho[] = []; // Declaración de la variable

  constructor(
    private ordenTrabajoService: OrdenTrabajoService, 
    private infoOtStateService: InfoOtStateService,
    private route: ActivatedRoute
  ) {
    this.formOT = new FormGroup({
      OT: new FormControl({ value: '', disabled: false }),
      selectedPedido: new FormControl({ value: null, disabled: false }),
      t_ped: new FormControl({ value: '', disabled: true }),
      asesor: new FormControl({ value: '', disabled: true }),
      cliente: new FormControl({ value: '', disabled: true }),
      obra: new FormControl({ value: '', disabled: true }),
      direccion: new FormControl({ value: '', disabled: true }),
      departamento: new FormControl({ value: '', disabled: true }),
      pais: new FormControl({ value: '', disabled: true }),
      ciudad: new FormControl({ value: '', disabled: true }),
      telefono: new FormControl({ value: '', disabled: true }),
      contacto: new FormControl({ value: '', disabled: true }),
      mail: new FormControl({ value: '', disabled: true }),
      plano: new FormControl({ value: '', disabled: true }),
      dibujo: new FormControl({ value: '', disabled: true }),
      venta: new FormControl({ value: '', disabled: true }),
      okventa: new FormControl({ value: '', disabled: true }),
      okdibujo: new FormControl({ value: '', disabled: true }),
      observacion_Pedido: new FormControl({ value: '', disabled: true }),
      okempaquevta: new FormControl({ value: '', disabled: true }),
      okdespacho: new FormControl({ value: '', disabled: true }),
      empaqueprod: new FormControl({ value: '', disabled: true }),
      okinstala: new FormControl({ value: '', disabled: true }),
      okempaque: new FormControl({ value: '', disabled: true }),
      okfacturacion2: new FormControl({ value: '', disabled: true }),
      okcotizacion: new FormControl({ value: '', disabled: true })
    
    });
  }

  ngOnInit() {
    this.infoOtStateService.id_OT$.subscribe(id => {
      this.id_OT = id;
  
      // Cuando llegue la OT, consultamos los pedidos
      if (this.id_OT) {
        this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
          next: (pedidos) => {
            this.infoOtStateService.setPedidos(pedidos); // Esto alimenta el observable pedidos$
          },
          error: (err) => {
            console.error('❌ Error al obtener pedidos:', err);
          }
        });
      }
    });
  
    this.infoOtStateService.pedidos$.subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  
    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      this.selectedPedido = pedido;
  
      if (pedido) {
        if (this.formOT.get('selectedPedido')?.value !== pedido) {
          this.formOT.get('selectedPedido')?.setValue(pedido, { emitEvent: false });
        }
        this.actualizarCampos();
      }
    });
  
    this.formOT.get('selectedPedido')?.valueChanges.subscribe((pedidoSeleccionado: Pedido) => {
      this.selectedPedido = pedidoSeleccionado;
      this.infoOtStateService.setSelectedPedido(this.selectedPedido);
      this.actualizarCampos();
    });
  }
  
  
  

  buscarPedidos() {
    this.id_OT = this.formOT.get('OT')?.value || '';
   
  
    this.infoOtStateService.setIdOT(this.id_OT);
  
    this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
      next: (data) => {
       
        this.pedidos = data;
        this.infoOtStateService.setPedidos(this.pedidos); 
  
        if (this.pedidos.length > 0) {
          const maxConsecutivo = Math.max(...this.pedidos.map(p => p.consecutivoPedido));
          const pedidoMayor = this.pedidos.find(p => p.consecutivoPedido === maxConsecutivo);
  
        
  
          if (pedidoMayor) {
            this.selectedPedido = pedidoMayor;
            this.formOT.get('selectedPedido')?.setValue(pedidoMayor);
            this.infoOtStateService.setSelectedPedido(this.selectedPedido); 
            this.actualizarCampos();
          }
        }
      },
      error: (err) => console.error('Error al obtener pedidos:', err),
    });
  }

  actualizarCampos() {
    if (!this.selectedPedido) return;
  
  
    this.ordenTrabajoService.obtenerInfoPedido(this.id_OT, this.selectedPedido.consecutivoPedido.toString())
      .subscribe({
        next: (infoPedido) => {
        
          // Aplanar el objeto para el formulario
          const formValues = {
            OT: this.id_OT,
            t_ped: infoPedido.ot?.descripcionTipoPedido || '',
            asesor: infoPedido.ot?.asesor || '',
            cliente: infoPedido.ot?.cliente || '',
            direccion: infoPedido.ot?.dirección || '',
            departamento: infoPedido.ot?.región || '',
            pais: infoPedido.ot?.país || '',
            ciudad: infoPedido.ot?.ciudad || '',
            telefono: infoPedido.ot?.telDomicilio || '',
            contacto: infoPedido.ot?.personaReceptora || '',
            mail: infoPedido.ot?.mailContacto || '',
            plano: infoPedido.infoPlano?.plano || '',
            dibujo: infoPedido.infoPlano?.dibujante || '',
            venta: infoPedido.ot?.fechaConfirmacionVenta || '',
            okventa: infoPedido.ot?.fechaEntregaDibujoDespiece || '',
            okdibujo: infoPedido.ot?.fechaEntregaProduccion || '',
            observacion_Pedido: infoPedido.ot?.observacionPedido || '', 
            okempaquevta: infoPedido.ot?.fechaEmpaqueVenta || '',
            okdespacho: infoPedido.ot?.fechaEmpaque || '',
            empaqueprod: infoPedido.ot?.fechaTerminadaEmpaque || '',
            okinstala: infoPedido.ot?.fechaFinalInstalacion || '',
            okempaque: infoPedido.ot?.fechaEmpaque || '',
            okfacturacion2: infoPedido.ot?.fechaFactura || '',
            okcotizacion: infoPedido.ot?.fechaFactura || ''
          };
  
          // Asignar los valores al formulario
          this.formOT.patchValue(formValues);

            this.fechaDespacho = infoPedido.fechaDespacho;
          this.programacionObra = infoPedido.programacionObra;

          this.infoOtStateService.setPlano(infoPedido.infoPlano?.plano || '');

        
        },
        error: (err) => console.error('Error al obtener la información del pedido:', err)
      });
  }
  
  

  cargarOTyPedido(event: { ot: string, pedido: string }) {
    this.id_OT = event.ot;
  
    this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
      next: (data) => {
        this.pedidos = data.sort((a, b) => b.consecutivoPedido - a.consecutivoPedido);
  
        const pedidoSeleccionado = this.pedidos.find(p => String(p.consecutivoPedido) === String(event.pedido));
  
        this.selectedPedido = pedidoSeleccionado;
  
        if (pedidoSeleccionado) {
          this.actualizarCampos();
        }
  
        // Guardar en el servicio
        this.infoOtStateService.setIdOT(this.id_OT);
        this.infoOtStateService.setPedidos(this.pedidos);
        this.infoOtStateService.setSelectedPedido(this.selectedPedido); // 🔹 Guardar selección
  
        // Cerrar el modal de programación
        this.modalVisibleProgramacion = false;
      },
      error: (err) => console.error('Error al obtener pedidos', err),
    });
  }
  
  

  showDialog() {
    this.modalVisible = true;
  }

  showDialogProgramacionOT() {
    this.modalVisibleProgramacion = true;
  }

  hideDialog() {
    this.modalVisible = false;
  }

  hideDialogProgramacion() {
    this.modalVisibleProgramacion = false;
  }
}