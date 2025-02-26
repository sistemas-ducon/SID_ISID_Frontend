import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-modal-observaciones',
  standalone: true,
  imports: [DialogModule, CommonModule, FloatLabelModule, FormsModule, ButtonModule, DropdownModule, InputTextModule, TabMenuModule, RouterModule],
  templateUrl: './modal-observaciones.component.html',
  styleUrl: './modal-observaciones.component.css'
})
export class ModalObservacionesComponent {
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  obra: string | undefined;

  closeModal() {
    this.visible = false;
    this.onClose.emit();
  }
}
