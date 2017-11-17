import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipresconcComponent } from './tipresconc.component';
import { TipresconcDetailComponent } from './tipresconc-detail.component';
import { TipresconcPopupComponent } from './tipresconc-dialog.component';
import { TipresconcDeletePopupComponent } from './tipresconc-delete-dialog.component';

export const tipresconcRoute: Routes = [
    {
        path: 'tipresconc',
        component: TipresconcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresconc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipresconc/:id',
        component: TipresconcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresconc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipresconcPopupRoute: Routes = [
    {
        path: 'tipresconc-new',
        component: TipresconcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresconc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipresconc/:id/edit',
        component: TipresconcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresconc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipresconc/:id/delete',
        component: TipresconcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresconc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
