import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogObservacionesComponent } from '../../Modals/observaciones/dialog-observaciones/dialog-observaciones.component';
import { ModalProgramacionOTComponent } from '../../Modals/modal-programacion-ot/modal-programacion-ot.component';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';
import { ActivatedRoute } from '@angular/router';

interface Consecutivo {
  name: string | null;
}

@Component({
  selector: 'app-info-ot',
  standalone: true,
  imports: [
    ...PRIME_NG_IMPORTS, CommonModule, RouterModule, DialogObservacionesComponent, ModalProgramacionOTComponent
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
    private infoOtStateService: InfoOtStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.infoOtStateService.id_OT$.subscribe(id => this.id_OT = id);
    this.infoOtStateService.pedidos$.subscribe(pedidos => this.pedidos = pedidos);
    
    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (!pedido || (this.selectedPedido && this.selectedPedido.consecutivoPedido === pedido.consecutivoPedido)) {
        return; // 🔹 Evita re-cargar datos si no hay cambio real
      }
      this.selectedPedido = pedido;
      this.actualizarCampos();
    });
  
    this.infoOtStateService.formData$.subscribe(data => this.formData = { ...data });
    this.infoOtStateService.programacionObra$.subscribe(data => this.programacionObra = [...data]);
    this.infoOtStateService.fechaDespacho$.subscribe(data => this.fechaDespacho = [...data]);
  }
  
  buscarPedidos() {
    if (this.id_OT.trim()) {
      this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
        next: (data) => {
          this.pedidos = data.map(p => ({
            ...p,
            idOT: this.id_OT  // 🔹 Agregar idOT aquí
          })).sort((a, b) => b.consecutivoPedido - a.consecutivoPedido);
  
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
        next: (infoPedido: InfoPedido) => { // 👈 Ahora InfoPedido usa las interfaces correctas
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
            Plano: infoPedido.infoPlano.plano,  // ✅ Ahora existe infoPlano
            Dibuja: infoPedido.infoPlano.dibujante,
            venta: infoPedido.ot.fechaConfirmacionVenta,
            okventa: infoPedido.ot.fechaEntregaDibujoDespiece,
            okdibujo: infoPedido.ot.fechaEntregaProduccion,
            Observacion: infoPedido.ot.observacionPedido,
            okempaquevta: infoPedido.ot.fechaEmpaqueVenta,
            okdespacho: infoPedido.ot.fechaTerminadaDespacho,
            empaqueprod: infoPedido.ot.fechaEmpaque,
            okinstala: infoPedido.ot.fechaFinalInstalacion,
            okempaque: infoPedido.ot.fechaTerminadaEmpaque,
          };
  
          // Guardar datos en el servicio para persistencia
          this.infoOtStateService.setFormData(this.formData);
          
        // 🔹 Guardar el plano en el servicio para que otros componentes lo usen
          this.infoOtStateService.setPlano(infoPedido.infoPlano.plano); 
  
          // 🔹 Asegurar que el pedido se mantiene en el servicio
          this.infoOtStateService.setSelectedPedido(this.selectedPedido);
  
          this.programacionObra = infoPedido.programacionObra || [];  // ✅ Ahora existe programacionObra
          this.infoOtStateService.setProgramacionObra(this.programacionObra);
  
          this.fechaDespacho = infoPedido.fechaDespacho || [];  // ✅ Ahora existe fechaDespacho
          this.infoOtStateService.setFechaDespacho(this.fechaDespacho);
        },
        error: (err) => {
          console.error('Error al obtener la información del pedido', err);
          this.formData = {}; 
          this.programacionObra = [];
          this.fechaDespacho = [];
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

