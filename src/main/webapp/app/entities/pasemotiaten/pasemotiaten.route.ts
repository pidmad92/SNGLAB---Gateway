import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PasemotiatenComponent } from './pasemotiaten.component';
import { PasemotiatenDetailComponent } from './pasemotiaten-detail.component';
import { PasemotiatenPopupComponent } from './pasemotiaten-dialog.component';
import { PasemotiatenDeletePopupComponent } from './pasemotiaten-delete-dialog.component';

export const pasemotiatenRoute: Routes = [
    {
        path: 'pasemotiaten',
        component: PasemotiatenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasemotiaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pasemotiaten/:id',
        component: PasemotiatenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasemotiaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pasemotiatenPopupRoute: Routes = [
    {
        path: 'pasemotiaten-new',
        component: PasemotiatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasemotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasemotiaten/:id/edit',
        component: PasemotiatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasemotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasemotiaten/:id/delete',
        component: PasemotiatenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasemotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
