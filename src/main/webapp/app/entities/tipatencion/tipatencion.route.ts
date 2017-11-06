import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipatencionComponent } from './tipatencion.component';
import { TipatencionDetailComponent } from './tipatencion-detail.component';
import { TipatencionPopupComponent } from './tipatencion-dialog.component';
import { TipatencionDeletePopupComponent } from './tipatencion-delete-dialog.component';

export const tipatencionRoute: Routes = [
    {
        path: 'tipatencion',
        component: TipatencionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipatencion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipatencion/:id',
        component: TipatencionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipatencion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipatencionPopupRoute: Routes = [
    {
        path: 'tipatencion-new',
        component: TipatencionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipatencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipatencion/:id/edit',
        component: TipatencionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipatencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipatencion/:id/delete',
        component: TipatencionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipatencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
