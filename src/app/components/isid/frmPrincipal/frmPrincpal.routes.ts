import { Routes } from '@angular/router';
import { DashboardFrmPrincipalComponent } from './dashboard-frm-principal/dashboard-frm-principal.component';
import { OrdenDeTrabajoComponent } from './orden-de-trabajo/orden-de-trabajo.component';
import { PlanoComponent } from './plano/plano.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { ProgfacturacionComponent } from './progfacturacion/progfacturacion.component';

export const DASHBOARDFRMPRINCIPAL_ROUTES: Routes = [
    {
        path: '',
        component: DashboardFrmPrincipalComponent,
        children: [
            { path: 'orden-de-trabajo', component: OrdenDeTrabajoComponent },
            { path: 'plano', component: PlanoComponent },
            { path: 'documentacion', component: DocumentacionComponent },
            { path: 'progfacturacion', component: ProgfacturacionComponent },
        ],
      },
];
