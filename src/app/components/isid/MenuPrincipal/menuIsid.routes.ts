import { Routes } from '@angular/router';
import { DashboardComponent } from '../../../shared/components/isid/InfoOT/dashboard/dashboard.component';
import { InfoOTComponent } from '../../../shared/components/isid/InfoOT/info-ot/info-ot.component';

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
  }
];

