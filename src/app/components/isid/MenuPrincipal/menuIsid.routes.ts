import { Routes } from '@angular/router';
import { DashboardComponent } from '../InfoOT/dashboard/dashboard.component';
import { InfoOTComponent } from '../InfoOT/info-ot/info-ot.component';
import { DashboardFrmPrincipalComponent } from '../frmPrincipal/dashboard-frm-principal/dashboard-frm-principal.component';
import { OrdenDeTrabajoComponent } from '../frmPrincipal/orden-de-trabajo/orden-de-trabajo.component';

export const MENU_ISID_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard es el contenedor principal
    children: [
      {
        path: '',
        component: InfoOTComponent, // Se carga dentro del Dashboard
      }
    ]
  },
  {
    path: 'dashboard-frm-principal',
    component: DashboardFrmPrincipalComponent, // Dashboard es el contenedor principal
    children: [
      {
        path: '',
        component: OrdenDeTrabajoComponent, // Se carga dentro del Dashboard
      }
    ]
  }
];

