import { Routes } from '@angular/router';
import { authGuard } from '../services/guards/auth.guard';

export const routes: Routes = [
  // Redirección inicial al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Ruta para el componente Login
  {
    path: 'login',
    loadComponent: () =>
      import('../components/general/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },

  // Redirección al módulo SID con protección
  {
    path: 'sid',
    loadChildren: () => import('./sid.routes').then((m) => m.SID_ROUTES),
    canActivate: [authGuard]
  },

  // Redirección al módulo ISID con protección
  {
    path: 'isid',
    loadChildren: () => import('./isid.routes').then((m) => m.ISID_ROUTES),
    canActivate: [authGuard]
  },

  // Menú principal protegido
  {
    path: 'menu-principal',
    loadComponent: () =>
      import('../components/general/menu-principal/menu-principal.component').then(
        (m) => m.MenuPrincipalComponent, 
      ),
      canActivate: [authGuard]
  },

  // Menú SID protegido
  {
    path: 'menu-sid',
    loadComponent: () =>
      import('../components/sid/MenuPrincipal/menu-sid/menu-sid.component').then(
        (m) => m.MenuSidComponent
      ), 
      canActivate: [authGuard]
  },

  // Menú ISID protegido
  {
    path: 'menu-isid',
    loadComponent: () =>
      import('../components/isid/MenuPrincipal/menu-isid/menu-isid.component').then(
        (m) => m.MenuIsidComponent
      ),  
      canActivate: [authGuard]
  },

  // Manejo de rutas desconocidas
  { path: '**', redirectTo: '/login' }
];
