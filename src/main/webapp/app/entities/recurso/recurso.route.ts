import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RecursoComponent } from './recurso.component';
import { RecursoDetailComponent } from './recurso-detail.component';
import { RecursoPopupComponent } from './recurso-dialog.component';
import { RecursoDeletePopupComponent } from './recurso-delete-dialog.component';

export const recursoRoute: Routes = [
    {
        path: 'recurso',
        component: RecursoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.recurso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recurso/:id',
        component: RecursoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.recurso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recursoPopupRoute: Routes = [
    {
        path: 'recurso-new',
        component: RecursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.recurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recurso/:id/edit',
        component: RecursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.recurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recurso/:id/delete',
        component: RecursoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.recurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
