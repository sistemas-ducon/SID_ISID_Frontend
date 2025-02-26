import { Routes } from '@angular/router';
import { MenuIsidComponent } from '../components/isid/MenuPrincipal/menu-isid/menu-isid.component';
import { MenuSidComponent } from '../components/sid/MenuPrincipal/menu-sid/menu-sid.component';
import { DASHBOARD_ROUTES } from '../shared/components/isid/InfoOT/dashboard.routes';

export const routes: Routes = [
  // Redirección inicial al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Ruta para el componente Login
  {
    path: 'login',
    loadComponent: () =>
      import('../shared/components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  // Redirección al módulo SID
  {
    path: 'sid',
    loadChildren: () => import('./sid.routes').then((m) => m.SID_ROUTES),
  },

  // Redirección al módulo ISID
  {
    path: 'isid',
    loadChildren: () => import('./isid.routes').then((m) => m.ISID_ROUTES),
  },
  {
    path: 'menu-principal',
    loadComponent: () =>
      import('../shared/components/auth/menu-principal/menu-principal.component').then(
        (m) => m.MenuPrincipalComponent
      ),
  },
  {
    path: 'menu-sid',
    loadComponent: () =>
      import('../components/sid/MenuPrincipal/menu-sid/menu-sid.component').then(
        (m) => m.MenuSidComponent
      ),
  },
  {
    path: 'menu-isid',
    loadComponent: () =>
      import('../components/isid/MenuPrincipal/menu-isid/menu-isid.component').then(
        (m) => m.MenuIsidComponent
      ),
  },
];

