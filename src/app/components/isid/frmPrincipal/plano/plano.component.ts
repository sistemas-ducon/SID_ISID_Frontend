import { Component } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { InfoPedido } from '../../../../models/isid/OrdenTrabajo/info-pedido.dto';

@Component({
  selector: 'app-plano',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule],
  templateUrl: './plano.component.html',
  styleUrl: './plano.component.css'
})
export class PlanoComponent {
  idOT: string = '';
  plano: string = '';
  consecutivoPedido: string = '';
  selectedInsumo: any;
  formData: any = {};

  isDisabled: boolean = true; 

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
  ) {}

  ngOnInit() {
    // Suscribirse al ID de la OT y al pedido seleccionado
    this.infoOtStateService.id_OT$.subscribe(id => {
      this.idOT = id;
      this.cargarDatos();
    });

    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (pedido) {
        this.consecutivoPedido = pedido.consecutivoPedido.toString();
        this.cargarDatos();
      }
    });
  }

  cargarDatos() {
    if (this.idOT && this.consecutivoPedido) {
      this.ordenTrabajoService.obtenerInfoPedido(this.idOT, this.consecutivoPedido).subscribe({
        next: (data: InfoPedido) => {
          this.formData.plano = data.infoPlano.plano;
          this.formData.dibuja = data.infoPlano.dibujante;
        },
        error: (err) => {
          console.error('Error al obtener los módulos', err);
        }
      });
    }
  }

  abrirDashboard() {
    if (!this.idOT || !this.consecutivoPedido) {
      alert('Por favor, ingrese un ID de OT y un Pedido antes de continuar.');
      return;
    }
  
    // 🔹 Guardar OT y Pedido en el servicio
    this.infoOtStateService.setIdOT(this.idOT);
    this.infoOtStateService.setSelectedPedido({ consecutivoPedido: this.consecutivoPedido });
  
    // 🔹 Abrir el dashboard en una nueva pestaña (sin pasar parámetros en la URL)
    const url = '/isid/menu-isid/dashboard';
    window.open(url, '_blank');
  }
  
  
  
}
