import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegimenlaboComponent } from './regimenlabo.component';
import { RegimenlaboDetailComponent } from './regimenlabo-detail.component';
import { RegimenlaboPopupComponent } from './regimenlabo-dialog.component';
import { RegimenlaboDeletePopupComponent } from './regimenlabo-delete-dialog.component';

export const regimenlaboRoute: Routes = [
    {
        path: 'regimenlabo',
        component: RegimenlaboComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlabo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'regimenlabo/:id',
        component: RegimenlaboDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlabo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regimenlaboPopupRoute: Routes = [
    {
        path: 'regimenlabo-new',
        component: RegimenlaboPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regimenlabo/:id/edit',
        component: RegimenlaboPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regimenlabo/:id/delete',
        component: RegimenlaboDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
