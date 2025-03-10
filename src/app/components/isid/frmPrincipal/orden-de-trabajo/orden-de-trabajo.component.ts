import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { Pedido } from '../../../../models/isid/OrdenTrabajo/pedido.dto';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { DialogObservacionesComponent } from '../../Modals/observaciones/dialog-observaciones/dialog-observaciones.component';

@Component({
  selector: 'app-orden-de-trabajo',
  standalone: true,
  imports: [CommonModule, PRIME_NG_IMPORTS, InputGroupModule, InputGroupAddonModule, DialogObservacionesComponent],
  templateUrl: './orden-de-trabajo.component.html',
  styleUrl: './orden-de-trabajo.component.css'
})
export class OrdenDeTrabajoComponent {
  id_OT: string = '';
  asesor: string = '';
  pedidosOrdTra: Pedido[] = [];
  selectedPedido: Pedido | undefined;
  selectedCountry: string | undefined;
  countries: any[] | undefined;
  isDisabled: boolean = true; 


  modalVisible = false;
  modalVisibleProgramacion = false;

  
  programacionObra: any[] = [];
  fechaDespacho: any[] = [];
  


  formData: any = {}; 

  checkedValue: boolean = false;

    constructor(
      private ordenTrabajoService: OrdenTrabajoService, 
      private infoOtStateService: InfoOtStateService
    ) {}

  ngOnInit() {
    // Recuperar los datos guardados al navegar
    this.infoOtStateService.id_OT$.subscribe(id => this.id_OT = id);
    this.infoOtStateService.pedidos$.subscribe(pedidos => this.pedidosOrdTra = pedidos);
    this.infoOtStateService.selectedPedido$.subscribe(pedido => this.selectedPedido = pedido);
    this.infoOtStateService.formData$.subscribe(data => this.formData = { ...data });
    this.infoOtStateService.programacionObra$.subscribe(data => this.programacionObra = [...data]);
    this.infoOtStateService.fechaDespacho$.subscribe(data => this.fechaDespacho = [...data]);
}

buscarPedidos() {
  if (this.id_OT.trim()) {
    this.ordenTrabajoService.obtenerPedidos(this.id_OT).subscribe({
      next: (data) => {
        this.pedidosOrdTra = data.sort((a, b) => b.consecutivoPedido - a.consecutivoPedido);
        if (this.pedidosOrdTra.length > 0) {
          this.selectedPedido = this.pedidosOrdTra[0];
          this.actualizarCampos();
        }

        // Guardar en el servicio
        this.infoOtStateService.setIdOT(this.id_OT);
        this.infoOtStateService.setPedidos(this.pedidosOrdTra);
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
          t_pedOrdTra: infoPedido.ot.descripcionTipoPedido,
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
          Empt_Vta: infoPedido.ot.fechaEmpaqueVenta,
          Empaque_Prod: infoPedido.ot.fechaEmpaque,
          Nit: infoPedido.ot.cocNIT,
          cocnombre: infoPedido.ot.cocNombre,
          cocciudad: infoPedido.ot.cocCiudad,
          cocdireccion: infoPedido.ot.cocDireccion,
          coctelefono: infoPedido.ot.cocTelefono,
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

hideDialog() {
  this.modalVisible = false;
}


showDialog() {
  this.modalVisible = true;
}
}
