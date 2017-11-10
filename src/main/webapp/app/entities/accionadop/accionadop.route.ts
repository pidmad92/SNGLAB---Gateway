import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccionadopComponent } from './accionadop.component';
import { AccionadopDetailComponent } from './accionadop-detail.component';
import { AccionadopPopupComponent } from './accionadop-dialog.component';
import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const accionadopRoute: Routes = [
    {
        path: 'accionadop',
        component: AccionadopComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'accionadop/:id',
        component: AccionadopDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accionadopPopupRoute: Routes = [
    {
        path: 'accionadop-new',
        component: AccionadopPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accionadop/:id/edit',
        component: AccionadopPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accionadop/:id/delete',
        component: AccionadopDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
