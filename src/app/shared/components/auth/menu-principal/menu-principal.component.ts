import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/login/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
})
export class MenuPrincipalComponent implements OnInit {
  opcionesDeAcceso: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.opcionesDeAcceso$.subscribe((opciones) => {
      this.opcionesDeAcceso = opciones;
      console.log('Opciones de acceso cargadas:', this.opcionesDeAcceso);
    });
  }
}
