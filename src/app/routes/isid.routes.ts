import { Routes } from '@angular/router';
import { MENU_ISID_ROUTES } from '../components/isid/MenuPrincipal/menuIsid.routes';
import { DASHBOARD_ROUTES } from '../components/isid/InfoOT/dashboard.routes';
import { DASHBOARDFRMPRINCIPAL_ROUTES } from '../components/isid/frmPrincipal/frmPrincpal.routes';


export const ISID_ROUTES: Routes = [
  { path: '', redirectTo: 'menu-isid', pathMatch: 'full' },
  {
    path: 'menu-isid',
    children: MENU_ISID_ROUTES, // Rutas del menú principal
  },
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES, //  Se agregan las rutas del dashboard
  },
  {
    path: 'dashboard-frm-principal',
    children:DASHBOARDFRMPRINCIPAL_ROUTES , //  Se agregan las rutas del dashboard
  },
];

