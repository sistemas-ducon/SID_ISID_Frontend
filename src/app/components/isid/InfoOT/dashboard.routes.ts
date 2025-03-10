import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoOTComponent } from './info-ot/info-ot.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { InsumosplanoComponent } from './insumosplano/insumosplano.component';
import { ObjespecificoComponent } from './objespecifico/objespecifico.component';
import { MoComponent } from './mo/mo.component';
import { DespieceComponent } from './despiece/despiece.component';
import { DocprodComponent } from './docprod/docprod.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { RegpedidoComponent } from './regpedido/regpedido.component';
import { ComprasComponent } from './compras/compras.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'info.ot', component: InfoOTComponent },
            { path: 'produccion', component: ProduccionComponent },
            { path: 'insumos-plano', component: InsumosplanoComponent },
            { path: 'obj-especifico', component: ObjespecificoComponent },
            { path: 'mo', component: MoComponent },
            { path: 'despiece', component: DespieceComponent },
            { path: 'doc-prod', component: DocprodComponent },
            { path: 'consultas', component: ConsultasComponent },
            { path: 'reg-pedido', component: RegpedidoComponent },
            { path: 'compras', component: ComprasComponent }
        ],
      },
];
