import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FormarchivoComponent } from './formarchivo.component';
import { FormarchivoDetailComponent } from './formarchivo-detail.component';
import { FormarchivoPopupComponent } from './formarchivo-dialog.component';
import { FormarchivoDeletePopupComponent } from './formarchivo-delete-dialog.component';

export const formarchivoRoute: Routes = [
    {
        path: 'formarchivo',
        component: FormarchivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formarchivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formarchivo/:id',
        component: FormarchivoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formarchivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formarchivoPopupRoute: Routes = [
    {
        path: 'formarchivo-new',
        component: FormarchivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formarchivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formarchivo/:id/edit',
        component: FormarchivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formarchivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formarchivo/:id/delete',
        component: FormarchivoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formarchivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
