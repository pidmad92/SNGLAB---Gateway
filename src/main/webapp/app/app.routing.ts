import { Route } from '@angular/router';
import { NavbarComponent } from './layouts';
import { LoginComponent } from './login/login.component';
import { UserRouteAccessService } from './shared/auth/user-route-access-service';

export const adminRoute: Route = {
    path: 'admin',
    loadChildren: 'admin/admin.module#AdminModule'
};
export const entityRoute: Route = {
    path: 'entity',
    loadChildren: './entities/entity.module#EntityModule'
};

export const seguridadRoute: Route = {
    path: 'seguridad',
    loadChildren: './entities/seguridad.module#SeguridadModule'
};

export const conciliacionesRoute: Route = {
    path: 'conciliaciones',
    loadChildren: './entities/consultas.module#ConsultasModule'
};

export const loginRoute: Route = {
    path: 'login',
    component: LoginComponent,
    data: {
        pageTitle: 'global.menu.login.titulo'
    },
    canActivate: [UserRouteAccessService]
};
