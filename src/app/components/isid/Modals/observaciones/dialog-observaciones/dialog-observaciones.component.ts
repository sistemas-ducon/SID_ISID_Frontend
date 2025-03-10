import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../../shared/NgPrime/prime-imports';
import { TabObservacionesOtComponent } from '../tab-observaciones-ot/tab-observaciones-ot.component';
import { TabObservacionesPendientesComponent } from '../tab-observaciones-pendientes/tab-observaciones-pendientes.component';
import { TabTodasObservacionesComponent } from '../tab-todas-observaciones/tab-todas-observaciones.component';
import { TabObservacionesPersonalesComponent } from '../tab-observaciones-personales/tab-observaciones-personales.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-observaciones',
  standalone: true,
  imports: [ ...PRIME_NG_IMPORTS, CommonModule, TabObservacionesOtComponent, TabObservacionesPendientesComponent, TabTodasObservacionesComponent, TabObservacionesPersonalesComponent],
  templateUrl: './dialog-observaciones.component.html',
  styleUrl: './dialog-observaciones.component.css'
})
export class DialogObservacionesComponent {
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  obra: string | undefined;
  activeTab: 'ot' | 'personal' | 'todas' | 'pendientes' = 'ot';

  setActiveTab(tab: 'ot' | 'personal' | 'todas' | 'pendientes') {
    this.activeTab = tab;
  }

  closeModal() {
    this.visible = false;
    this.onClose.emit();
  }
}
