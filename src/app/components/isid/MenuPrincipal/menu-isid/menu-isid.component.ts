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
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' },
              { label: 'Programar Recogida', icon: 'pi pi-check' }
            ]
          },
          {
            label: 'Empaque y Despacho',
            icon: 'pi pi-box',
            items: [
              { label: 'Control de mantenimiento', icon: 'pi pi-check' },
              { label: 'Despacho de Obra', icon: 'pi pi-check' },
              { label: 'Empaque', icon: 'pi pi-check' },
              { label: 'Empaque x Modulo', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Diseño', disabled: true,
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard' }
            ]
          },
          {
            label: 'Diseño en el exterior', disabled: true,
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
              { label: 'Chequeo Financiero', icon: 'pi pi-check' },
              { label: 'Despacho de Obras', icon: 'pi pi-check' },
              { label: 'Orden de Trabajo', icon: 'pi pi-file', routerLink: '/isid/menu-isid/dashboard-frm-principal' },
              { label: 'Programacion Ordenes TS del SID', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Gestion calidad Admon',
            icon: 'pi pi-box',
            items: [
              { label: 'Gestion calidad Admon', icon: 'pi pi-check' }
            ]
          },
          {
            label: 'Gestion calidad Usr',
            icon: 'pi pi-box',
            items: [
              { label: 'Gestion calidad Usr', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Instalacion',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Control de Mantenimiento', icon: 'pi pi-check' },
              { label: 'Empaque de Pedido', icon: 'pi pi-check' },
              { label: 'Proyeccion y Programacion', icon: 'pi pi-check' },
              { label: 'Ordenes de Trabajo', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Proceso productivo',
            icon: 'pi pi-box',
            items: [
              { label: 'Programacion de proceso', icon: 'pi pi-check' },
              { label: 'Reporte de Obra', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Produccion',
            icon: 'pi pi-box',
            items: [
              { label: 'Cierre de Obra', icon: 'pi pi-check' },
              { label: 'Control de mantenimiento', icon: 'pi pi-check' },
              { label: 'Emapque de Obras', icon: 'pi pi-check' },
              { label: 'Estadistica Produccion', icon: 'pi pi-check' },
              { label: 'Generar Programacion Ots de SID', icon: 'pi pi-check' },
              { label: 'Mano de Obra', icon: 'pi pi-check' },
              { label: 'Ordenes de Trabajo', icon: 'pi pi-check' },
            ]
          },
          {
            label: 'Recepcion', disabled: true,
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
            label: 'Ventas', disabled: true,
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
