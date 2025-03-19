import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';  
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarVisible1: boolean = false;
  selectedOption: string | null = null;  
  currentRoute: string = '';  // Nueva variable para almacenar la ruta actual

  options: string[] = [
    'Info.OT',
    'Produccion',
    'Insumos Plano',
    'Obj.Especifico',
    'MO',
    'Despiece',
    'Doc.Prod',
    'Consultas',
    'Reg.Pedido',
    'Compras'
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
      'Info.OT': 'info.ot',
      'Produccion': 'produccion',
      'Insumos Plano': 'insumos-plano',
      'Obj.Especifico': 'obj-especifico',
      'MO': 'mo',
      'Despiece': 'despiece',
      'Doc.Prod': 'doc-prod',
      'Consultas': 'consultas',
      'Reg.Pedido': 'reg-pedido',
      'Compras': 'compras'
    };
  
    const route = routeMap[option];  
    if (route) {
      this.router.navigate([`/isid/dashboard/${route}`]);  
    }
  }

  goToMenuIsid(): void {
    this.router.navigate(['/menu-isid']);
  }
}
