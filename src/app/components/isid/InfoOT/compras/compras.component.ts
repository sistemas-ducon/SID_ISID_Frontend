import { Component } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { OrdenTrabajoService } from '../../../../services/isid/OrdenTrabajo/orden-trabajo.service';
import { InfoOtStateService } from '../../../../services/isid/OrdenTrabajo/info-ot-state.service';
import { Compra } from '../../../../models/isid/OrdenTrabajo/compras.dto';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [PRIME_NG_IMPORTS],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras: Compra[] = [];
  idOT!: string;
  consecutivoPedido!: string;
  modalVisibleProveedores = false;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private infoOtStateService: InfoOtStateService
  ) {}

  ngOnInit(): void {
    // Obtener el idOT y el consecutivoPedido del servicio InfoOtStateService
    this.infoOtStateService.selectedPedido$.subscribe(pedido => {
      if (pedido) {
        this.idOT = pedido.idOT;
        this.consecutivoPedido = pedido.consecutivoPedido?.toString();
        this.obtenerCompras(); // Llamar al servicio cuando tengamos los datos
      }
    });
  }

  obtenerCompras() {
    if (!this.idOT || !this.consecutivoPedido) return;

  
    this.ordenTrabajoService.obtenerCompras(this.idOT, this.consecutivoPedido).subscribe({
      next: (response) => {
        this.compras = response.compras;
      },
      error: (error) => {
        console.error('Error al obtener compras:', error);
      }
    });
  }
  

  showDialogProveedores() {
    this.modalVisibleProveedores = true;
  }
}
