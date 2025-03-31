import { Component, Input, Output } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras-proveedor',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule],
  templateUrl: './compras-proveedor.component.html',
  styleUrl: './compras-proveedor.component.css'
})
export class ComprasProveedorComponent {
  @Input() visible: boolean = false;

  closeModal() {
    this.visible = false;

  }

}
