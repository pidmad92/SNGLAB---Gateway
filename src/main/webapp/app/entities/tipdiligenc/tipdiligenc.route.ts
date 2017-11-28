import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdiligencComponent } from './tipdiligenc.component';
import { TipdiligencDetailComponent } from './tipdiligenc-detail.component';
import { TipdiligencPopupComponent } from './tipdiligenc-dialog.component';
import { TipdiligencDeletePopupComponent } from './tipdiligenc-delete-dialog.component';

export const tipdiligencRoute: Routes = [
    {
        path: 'tipdiligenc',
        component: TipdiligencComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdiligenc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdiligenc/:id',
        component: TipdiligencDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdiligenc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdiligencPopupRoute: Routes = [
    {
        path: 'tipdiligenc-new',
        component: TipdiligencPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdiligenc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdiligenc/:id/edit',
        component: TipdiligencPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdiligenc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdiligenc/:id/delete',
        component: TipdiligencDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdiligenc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
