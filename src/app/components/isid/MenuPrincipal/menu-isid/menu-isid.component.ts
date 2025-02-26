import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu-isid',
  standalone: true,
  imports: [MenubarModule, CommonModule, RouterModule, ButtonModule],
  templateUrl: './menu-isid.component.html',
  styleUrl: './menu-isid.component.css'
})
export class MenuIsidComponent implements OnInit {
  items: MenuItem[] = [];
  usuario: string | null = "Usuario";

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Departamento',
        icon: 'pi pi-sitemap',
        items: [
          {
            label: 'Administrativo',
            icon: 'pi pi-users',
            items: [
              { label: 'Gerencia Comercial', icon: 'pi pi-briefcase', items: [
                  { label: 'Actualizar Precios', icon: 'pi pi-dollar' },
                  { label: 'Ventas', icon: 'pi pi-shopping-cart' }
                ]
              }
            ]
          },
          {
            label: 'Almacén',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Compras',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Empaque y Despacho',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Diseño',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Diseño en el exterior',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Facturacion y cartera',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Gestion calidad Admon',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Gestion calidad Usr',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Instalacion',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Proceso productivo',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Produccion',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Recepcion',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Sistemas',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Sistemas',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
        ]
      },
      {
        label: 'Persona',
        icon: 'pi pi-link'
      },
      {
        label: 'Consultas',
        icon: 'pi pi-external-link',
        items: [
          { label: 'Angular', icon: 'pi pi-globe', url: 'https://angular.io/' },
          { label: 'Vite.js', icon: 'pi pi-globe', url: 'https://vitejs.dev/' }
        ]
      },
    ];
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
    this.router.navigate(['/login']);
  }
}
