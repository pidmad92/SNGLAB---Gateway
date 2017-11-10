import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EmpleadorComponent } from './empleador.component';
import { EmpleadorDetailComponent } from './empleador-detail.component';
import { EmpleadorPopupComponent } from './empleador-dialog.component';
import { EmpleadorDeletePopupComponent } from './empleador-delete-dialog.component';

export const empleadorRoute: Routes = [
    {
        path: 'empleador',
        component: EmpleadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.empleador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'empleador/:id',
        component: EmpleadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.empleador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empleadorPopupRoute: Routes = [
    {
        path: 'empleador-new',
        component: EmpleadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.empleador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleador/:id/edit',
        component: EmpleadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.empleador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleador/:id/delete',
        component: EmpleadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.empleador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
