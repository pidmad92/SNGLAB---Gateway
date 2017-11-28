import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RespinformaComponent } from './respinforma.component';
import { RespinformaDetailComponent } from './respinforma-detail.component';
import { RespinformaPopupComponent } from './respinforma-dialog.component';
import { RespinformaDeletePopupComponent } from './respinforma-delete-dialog.component';

export const respinformaRoute: Routes = [
    {
        path: 'respinforma',
        component: RespinformaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.respinforma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'respinforma/:id',
        component: RespinformaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.respinforma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const respinformaPopupRoute: Routes = [
    {
        path: 'respinforma-new',
        component: RespinformaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.respinforma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'respinforma/:id/edit',
        component: RespinformaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.respinforma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'respinforma/:id/delete',
        component: RespinformaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.respinforma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
