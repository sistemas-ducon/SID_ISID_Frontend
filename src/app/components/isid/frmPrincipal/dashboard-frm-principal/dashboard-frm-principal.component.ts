import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; 
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';
import { SidebarModule } from 'primeng/sidebar';
// Comentario de prueba subir cambios 
@Component({
  selector: 'app-dashboard-frm-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, PRIME_NG_IMPORTS, SidebarModule],
  templateUrl: './dashboard-frm-principal.component.html',
  styleUrl: './dashboard-frm-principal.component.css'
})
export class DashboardFrmPrincipalComponent {
 sidebarVisible1: boolean = false;
  selectedOption: string | null = null;  
  currentRoute: string = '';  // Nueva variable para almacenar la ruta actual

  options: string[] = [
    'Orden de trabajo',
    'Plano',
    'Documentacion',
    'Prog Facturacion',
  ];

  

  constructor(private router: Router, private route: ActivatedRoute) {
    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/').pop() || ''; // Obtiene la última parte de la ruta
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.sidebarVisible1 = false;  
  
    const routeMap: { [key: string]: string } = {
      'Orden de trabajo': 'orden-de-trabajo',
      'Plano': 'plano',
      'Documentacion': 'documentacion',
      'Prog Facturacion': 'progfacturacion',
    };
  
    const route = routeMap[option];  
    if (route) {
      this.router.navigate([`/isid/dashboard-frm-principal/${route}`]);  
    }
  }

  goToMenuIsid(): void {
    this.router.navigate(['/menu-isid']);
  }
}
