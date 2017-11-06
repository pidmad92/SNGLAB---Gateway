
import { Routes } from '@angular/router';
import { HomeComponent } from './';
import { UserRouteAccessService } from '../shared';

export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
