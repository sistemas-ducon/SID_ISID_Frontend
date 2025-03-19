import { Component } from '@angular/core';
import { PRIME_NG_IMPORTS } from '../../../../../shared/NgPrime/prime-imports';
import { ObservacionesService } from '../../../../../services/isid/Observaciones/observaciones.service';
import { AuthService } from '../../../../../services/login/auth.services.ts.service';
import { CommonModule } from '@angular/common';
import { SessionServiceService } from '../../../../../services/login/guardarsesion/session-service.service';

@Component({
  selector: 'app-tab-observaciones-personales',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, CommonModule],
  templateUrl: './tab-observaciones-personales.component.html',
  styleUrl: './tab-observaciones-personales.component.css'
})
export class TabObservacionesPersonalesComponent {
  observacionesPorLeer: any[] = [];
  observacionesGrabadasYNoLeidas: any[] = [];
  selectedInsumo: any;

  obra: string | undefined;

  constructor(
    private observacionesService: ObservacionesService,
    private authService: AuthService, private SessionServiceService: SessionServiceService, 
  ) {}

  ngOnInit(): void {
    const usuario = this.SessionServiceService.obtenerSesion();
    if (usuario && usuario.cedula) {
      this.cargarObservaciones(usuario.cedula);
      this.cargarObservacionesGrabadasNoLeidas(usuario.cedula);
    }
  }

  cargarObservaciones(cedula: string): void {
    this.observacionesService.obtenerObservacionesPersonales(cedula).subscribe({
      next: (data) => {
        this.observacionesPorLeer = data?.observacionesPendientes?.observacionesPorLeer || [];
      },
      error: (err) => console.error('Error al obtener observaciones:', err),
    });
  }

  cargarObservacionesGrabadasNoLeidas(cedula: string): void {
    this.observacionesService.obtenerObservacionesPersonales(cedula).subscribe({
      next: (data) => {
        this.observacionesGrabadasYNoLeidas = data?.observacionesPendientes?.observacionesGrabadasYNoLeidas || [];
      },
      error: (err) => console.error('Error al obtener observaciones:', err),
    });
  }
}
