import { Routes } from '@angular/router';
import { OrdenTrabajoSidComponent } from '../OrdenTrabajo/orden-trabajo-sid/orden-trabajo-sid.component';

export const MENU_SID_ROUTES: Routes = [
  {
    path: 'orden-trabajo', // Ruta relativa dentro del módulo `menu-isid`
    component: OrdenTrabajoSidComponent,
  },
  // Agrega aquí otras rutas internas si es necesario
];
