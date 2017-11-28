import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SegsaludComponent } from './segsalud.component';
import { SegsaludDetailComponent } from './segsalud-detail.component';
import { SegsaludPopupComponent } from './segsalud-dialog.component';
import { SegsaludDeletePopupComponent } from './segsalud-delete-dialog.component';

export const segsaludRoute: Routes = [
    {
        path: 'segsalud',
        component: SegsaludComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.segsalud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'segsalud/:id',
        component: SegsaludDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.segsalud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const segsaludPopupRoute: Routes = [
    {
        path: 'segsalud-new',
        component: SegsaludPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.segsalud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'segsalud/:id/edit',
        component: SegsaludPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.segsalud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'segsalud/:id/delete',
        component: SegsaludDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.segsalud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
