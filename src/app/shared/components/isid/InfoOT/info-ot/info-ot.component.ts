import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ModalObservacionesComponent } from '../../compartido/modal-observaciones/modal-observaciones.component';
import { ModalProgramacionOTComponent } from '../../compartido/modal-programacion-ot/modal-programacion-ot.component';
import { OrdenTrabajoService, Pedido } from '../../../../../services/isid/orden-trabajo.service';
import { InfoOtStateService } from '../../../../../services/isid/info-ot-state.service';
import { TableModule } from 'primeng/table';


interface Consecutivo {
  name: string | null;
}

@Component({
  selector: 'app-info-ot',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, TabMenuModule, DropdownModule, InputTextModule, 
    FloatLabelModule, ButtonModule, DialogModule, ModalObservacionesComponent, ModalProgramacionOTComponent, TableModule
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
  fechaDespacho: any[] = [];

  formData: any = {}; // Se mantiene como objeto
  isDisabled: boolean = true; 

  modalVisible = false;
  modalVisibleProgramacion = false;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService, 
    private infoOtStateService: InfoOtStateService
  ) {}

  ngOnInit() {
    // Recuperar los datos guardados al navegar
    this.infoOtStateService.id_OT$.subscribe(id => this.id_OT = id);
    this.infoOtStateService.pedidos$.subscribe(pedidos => this.pedidos = pedidos);
    this.infoOtStateService.selectedPedido$.subscribe(pedido => this.selectedPedido = pedido);
    this.infoOtStateService.formData$.subscribe(data => this.formData = { ...data });
    this.infoOtStateService.programacionObra$.subscribe(data => this.programacionObra = [...data]);
    this.infoOtStateService.fechaDespacho$.subscribe(data => this.fechaDespacho = [...data]);
  }

  buscarPedidos() {
    if (this.id_OT.trim()) {
      this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
        next: (data) => {
          this.pedidos = data.sort((a, b) => b.consecutivoPedido - a.consecutivoPedido);
          if (this.pedidos.length > 0) {
            this.selectedPedido = this.pedidos[0];
            this.actualizarCampos();
          }

          // Guardar en el servicio
          this.infoOtStateService.setIdOT(this.id_OT);
          this.infoOtStateService.setPedidos(this.pedidos);
          this.infoOtStateService.setSelectedPedido(this.selectedPedido);
        },
        error: (err) => console.error('Error al obtener pedidos', err),
      });
    }
  }

  actualizarCampos() {
    if (!this.selectedPedido) return;

    this.ordenTrabajoService.obtenerInfoPedido(this.id_OT, this.selectedPedido.consecutivoPedido.toString())
      .subscribe({
        next: (infoPedido) => {
          this.formData = {
            t_ped: infoPedido.ot.descripcionTipoPedido,
            asesor: infoPedido.ot.asesor,
            cliente: infoPedido.ot.cliente,
            obra: infoPedido.ot.nombreObra,
            direccion: infoPedido.ot.dirección,
            departamento: infoPedido.ot.región,
            pais: infoPedido.ot.país,
            ciudad: infoPedido.ot.ciudad,
            telefono: infoPedido.ot.telDomicilio,
            Contacto: infoPedido.ot.personaReceptora,
            Mail: infoPedido.ot.mailContacto,
            Plano: infoPedido.infoPlano.plano,
            Dibuja: infoPedido.infoPlano.dibujante,
            venta: infoPedido.ot.fechaConfirmacionVenta,
            okventa: infoPedido.ot.fechaEntregaDibujoDespiece,
            okdibujo: infoPedido.ot.fechaEntregaProduccion,

            Observacion: infoPedido.ot.observacionPedido,
            
          };

          this.infoOtStateService.setFormData(this.formData);

         this.programacionObra = infoPedido.programacionObra || [];
         this.infoOtStateService.setProgramacionObra(this.programacionObra);

         this.fechaDespacho = infoPedido.fechaDespacho || [];
         this.infoOtStateService.setFechaDespacho(this.fechaDespacho);
       },
       error: (err) => {
         console.error('Error al obtener la información del pedido', err);
         this.formData = {}; 
         this.programacionObra = [];
         this.infoOtStateService.setFormData({});
         this.infoOtStateService.setProgramacionObra([]);
         this.infoOtStateService.setFechaDespacho([]);
       }
     });
  }

  cargarOTyPedido(event: { ot: string, pedido: string }) {
    this.id_OT = event.ot;
  
    this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
      next: (data) => {
        this.pedidos = data.sort((a, b) => b.consecutivoPedido - a.consecutivoPedido);
  

  
        const pedidoSeleccionado = this.pedidos.find(p => {
          return String(p.consecutivoPedido) === String(event.pedido);
        });
  
  
        this.selectedPedido = pedidoSeleccionado;
  
        if (pedidoSeleccionado) {
          this.actualizarCampos();
        }
  
        // Guardar en el servicio
        this.infoOtStateService.setIdOT(this.id_OT);
        this.infoOtStateService.setPedidos(this.pedidos);
        this.infoOtStateService.setSelectedPedido(this.selectedPedido);
  
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

