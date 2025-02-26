import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-menu-sid',
  standalone: true,
  imports: [MenubarModule, CommonModule, RouterModule],
  templateUrl: './menu-sid.component.html',
  styleUrls: ['./menu-sid.component.css'] // Cambié styleUrl a styleUrls
})
export class MenuSidComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Departamento',
        icon: 'pi pi-palette',
        items: [
            {
              label: 'Administrativo',
              items: [
                { label: 'Gerencia Comercial', icon: 'pi pi-users' },
                { label: 'Ventas', icon: 'pi pi-shopping-cart' },
              ],
              },
              {
                label: 'Compras',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Diseño desarrollo',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                  {
                    label: 'Orden de Trabajo',
                    route: '/sid/menu-sid/orden-trabajo',
                  },
                ],
              },
              {
                label: 'Diseño en el exterior',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Facturacion y cartera',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Gestion y calidad Admon',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Gestion y calidad Usr',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Instalacion',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Recepcion',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Sistemas',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                ],
              },
              {
                label: 'Ventas',
                items: [
                  {
                      label: 'Cierre de Obra',
                    },
                    {
                      label: 'Orden de Trabajo',
                      route: '/sid/menu-sid/orden-trabajo',
                    },
                ],
              },
            {
              label: 'Almacen',
              items: [
                {
                    label: 'Cierre de Obra',
                  },
                {
                  label: 'Orden de Trabajo',
                  route: '/sid/menu-sid/orden-trabajo',
                },
              ],
            },
          ],
      },
      {
        label: 'Persona',
        icon: 'pi pi-link',
      },
      {
        label: 'Consultas',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Angular',
            url: 'https://angular.io/',
          },
          {
            label: 'Vite.js',
            url: 'https://vitejs.dev/',
          },
        ],
      },
    ];
  }
}
