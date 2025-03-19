import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/login/auth.services.ts.service';
import { RouterModule } from '@angular/router';
import { SessionServiceService } from '../../../services/login/guardarsesion/session-service.service';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuPrincipalComponent implements OnInit {
  opcionesDeAcceso: string[] = [];

  constructor(private authService: AuthService, private SessionServiceService: SessionServiceService) {}

  ngOnInit() {
    this.SessionServiceService.usuario$.subscribe((usuario) => {
      this.opcionesDeAcceso = usuario?.opcionesDeAcceso || [];
    });
  }
  
}
