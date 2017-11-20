import { Route } from '@angular/router';
import { NavbarComponent } from './layouts';
import { LoginComponent } from './login/login.component';
import { UserRouteAccessService } from './shared/auth/user-route-access-service';

export const adminRoute: Route = {
    path: 'admin',
    loadChildren: './admin/admin.module#GatewayAdminModule'
};
export const entityRoute: Route = {
    path: 'entity',
    loadChildren: './entities/entity.module#EntityModule'
};

export const seguridadRoute: Route = {
    path: 'seguridad',
    loadChildren: './applications/seguridad/seguridad.module#GatewaySeguridadModule'
};

export const consultasRoute: Route = {
    path: 'consultas',
    loadChildren: './applications/consultas/consultas.module#GatewayConsultasModule'
};

export const sindicatosRoute: Route = {
    path: 'sindicatos',
    loadChildren: './applications/sindicatos/sindicatos.module#GatewaySindicatosModule'
};

export const defensaRoute: Route = {
    path: 'defensa',
    loadChildren: './applications/defensa/defensa.module#GatewayDefensaModule'
};

export const loginRoute: Route = {
    path: 'login',
    component: LoginComponent,
    data: {
        pageTitle: 'global.menu.login.titulo'
    },
    canActivate: [UserRouteAccessService]
};
