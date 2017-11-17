import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstexpedienComponent } from './estexpedien.component';
import { EstexpedienDetailComponent } from './estexpedien-detail.component';
import { EstexpedienPopupComponent } from './estexpedien-dialog.component';
import { EstexpedienDeletePopupComponent } from './estexpedien-delete-dialog.component';

export const estexpedienRoute: Routes = [
    {
        path: 'estexpedien',
        component: EstexpedienComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estexpedien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estexpedien/:id',
        component: EstexpedienDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estexpedien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estexpedienPopupRoute: Routes = [
    {
        path: 'estexpedien-new',
        component: EstexpedienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estexpedien/:id/edit',
        component: EstexpedienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estexpedien/:id/delete',
        component: EstexpedienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
