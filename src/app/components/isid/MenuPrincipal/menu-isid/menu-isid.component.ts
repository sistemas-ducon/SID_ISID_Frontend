import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/enviroments';
import { PRIME_NG_IMPORTS } from '../../../../shared/NgPrime/prime-imports';

import { UsuarioDto } from '../../../../models/login/UsuarioDto';
import { SessionServiceService } from '../../../../services/login/guardarsesion/session-service.service';
import { CompartidoService } from '../../../../services/general/general.service';

@Component({
  selector: 'app-menu-isid',
  standalone: true,
  imports: [PRIME_NG_IMPORTS, MenubarModule, CommonModule, RouterModule],
  templateUrl: './menu-isid.component.html',
  styleUrl: './menu-isid.component.css'
})
export class MenuIsidComponent implements OnInit {
  logoUrl = `${environment.assetUrl}ducon.jpg`;

  items: MenuItem[] = [];
  //Variable para nombre de usuario 
  usuario: string | null = null;


  constructor(private router: Router,private sesionService:SessionServiceService,private compartidoServices: CompartidoService, ) { }

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
              {
                label: 'Gerencia Comercial', icon: 'pi pi-briefcase', items: [
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
              { label: 'Orden de Trabajo', icon: 'pi pi-file' },
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
              { label: 'Ordenes de Trabajo', icon: 'pi pi-file', command: () => this.validarPermisoAntesDeNavegar('Producción', '/isid/menu-isid/dashboard-frm-principal',) },
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
      //Personas
      {
        label: 'Persona',
        icon: 'pi pi-user',
        items: [

          //Cliente 
          {
            label: 'Cliente',
            icon: 'pi pi-user',

          },

          //Empleado
          {
            label: 'Empleado',
            icon: 'pi pi-user',

          }
        ]

      },
      //Consultas
      {
        label: 'Consultas',
        icon: 'bi bi-search',
        items: [

          //Despacho de Obra
          {
            label: 'Despacho Obra',
            icon: 'pi pi-truck'
          },

          //Insumo
          {
            label: 'Insumo',
            icon: 'pi pi-server'
          },

          //Módulo
          {
            label: 'Módulo',
            icon: 'pi pi-pencil'
          },

          //Todas las OT (Manuales/SID)
          {
            label: 'Todas las OT (Manuales/SID)',
            icon: 'pi pi-palette',

          },

          //Estadísticas Sucesos de Obra
          {
            label: 'Estadísticas Sucesos de Obra',
            icon: 'pi pi-palette',

          },

          //Actas de Entrega
          {
            label: 'Actas de Entrega',
            icon: 'pi pi-palette',

          },

          //Reprocesos
          {
            label: 'Reprocesos',
            icon: 'pi pi-palette',

          },

          //PQRSF
          {
            label: 'PQRSF',
            icon: 'pi pi-palette',

          },

          //Producto no Conforme
          {
            label: 'Producto no Conforme',
            icon: 'pi pi-palette',

          }
        ]
      },
    ];


  }

  cerrarSesion() {
    console.log('Cerrar sesión');

    // 🔹 Limpiar localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('opcionesDeAcceso');

    // 🔹 Redirigir al login
    this.router.navigate(['/login']);
  }

  /** Obtiene la sesión del localStorage */
  obtenerSesion(): UsuarioDto | null {
    const sesionString = localStorage.getItem('usuario');
    return sesionString ? JSON.parse(sesionString) : null;
  }

  /** Función que valida si el usuario tiene el permiso antes de navegar */
  validarPermisoAntesDeNavegar(permission: string, routerLink: string) {
    const permisosISID = this.sesionService.obtenerPermisosDesdeToken('ISID');
    if (permisosISID.includes(permission)) {
      this.router.navigate([routerLink]);
    } else {
      this.compartidoServices.mostrarAlerta("No cuenta con el permiso para este módulo");
    }
  }


 


}
