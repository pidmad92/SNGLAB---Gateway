import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipenvnotComponent } from './tipenvnot.component';
import { TipenvnotDetailComponent } from './tipenvnot-detail.component';
import { TipenvnotPopupComponent } from './tipenvnot-dialog.component';
import { TipenvnotDeletePopupComponent } from './tipenvnot-delete-dialog.component';

export const tipenvnotRoute: Routes = [
    {
        path: 'tipenvnot',
        component: TipenvnotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipenvnot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipenvnot/:id',
        component: TipenvnotDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipenvnot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipenvnotPopupRoute: Routes = [
    {
        path: 'tipenvnot-new',
        component: TipenvnotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipenvnot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipenvnot/:id/edit',
        component: TipenvnotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipenvnot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipenvnot/:id/delete',
        component: TipenvnotDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipenvnot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
