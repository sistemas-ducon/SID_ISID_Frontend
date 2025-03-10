import { Routes } from '@angular/router';
import { MENU_SID_ROUTES } from '../components/sid/MenuPrincipal/menuSid.routes';
import { DASHBOARD_ROUTES } from '../components/isid/InfoOT/dashboard.routes';

export const SID_ROUTES: Routes = [
  { path: '', redirectTo: 'menu-sid', pathMatch: 'full' },
  {
    path: 'menu-sid',
    children: MENU_SID_ROUTES, // Importa las rutas específicas de `menu-isid`
  },
];



