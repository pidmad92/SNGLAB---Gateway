import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModacontratoComponent } from './modacontrato.component';
import { ModacontratoDetailComponent } from './modacontrato-detail.component';
import { ModacontratoPopupComponent } from './modacontrato-dialog.component';
import { ModacontratoDeletePopupComponent } from './modacontrato-delete-dialog.component';

export const modacontratoRoute: Routes = [
    {
        path: 'modacontrato',
        component: ModacontratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modacontrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modacontrato/:id',
        component: ModacontratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modacontrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modacontratoPopupRoute: Routes = [
    {
        path: 'modacontrato-new',
        component: ModacontratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modacontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modacontrato/:id/edit',
        component: ModacontratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modacontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modacontrato/:id/delete',
        component: ModacontratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modacontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
