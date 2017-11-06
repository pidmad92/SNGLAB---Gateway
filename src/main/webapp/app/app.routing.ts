import { Route } from '@angular/router';
import { NavbarComponent } from './layouts';
import { LoginComponent } from './login/login.component';

export const adminRoute: Route = {
    path: 'admin',
    loadChildren: 'admin/admin.module#AdminModule'
};
export const entityRoute: Route = {
    path: 'entity',
    loadChildren: './entities/entity.module#EntityModule'
};

export const loginRoute: Route = {
    path: 'login',
    component: LoginComponent,
    data: {
        pageTitle: 'global.menu.login.titulo'
    },
};
