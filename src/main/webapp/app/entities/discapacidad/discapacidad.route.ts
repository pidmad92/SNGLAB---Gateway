import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DiscapacidadComponent } from './discapacidad.component';
import { DiscapacidadDetailComponent } from './discapacidad-detail.component';
import { DiscapacidadPopupComponent } from './discapacidad-dialog.component';
import { DiscapacidadDeletePopupComponent } from './discapacidad-delete-dialog.component';

export const discapacidadRoute: Routes = [
    {
        path: 'discapacidad',
        component: DiscapacidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discapacidad/:id',
        component: DiscapacidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discapacidadPopupRoute: Routes = [
    {
        path: 'discapacidad-new',
        component: DiscapacidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discapacidad/:id/edit',
        component: DiscapacidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discapacidad/:id/delete',
        component: DiscapacidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
