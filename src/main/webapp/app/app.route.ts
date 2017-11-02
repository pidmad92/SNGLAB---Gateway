import { Route } from '@angular/router';

import { NavbarComponent, LeftbarComponent, TopbarComponent } from './layouts';

export const navbarRoute: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
};

export const leftbarRoute: Route = {
    path: '',
    component: LeftbarComponent,
    outlet: 'leftbar'
};

export const topbarRoute: Route = {
    path: '',
    component: TopbarComponent,
    outlet: 'topbar'
};
