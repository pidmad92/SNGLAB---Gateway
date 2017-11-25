import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MultaconciComponent } from './multaconci.component';
import { MultaconciDetailComponent } from './multaconci-detail.component';
import { MultaconciPopupComponent } from './multaconci-dialog.component';
import { MultaconciDeletePopupComponent } from './multaconci-delete-dialog.component';

export const multaconciRoute: Routes = [
    {
        path: 'multaconci',
        component: MultaconciComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multaconci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'multaconci/:id',
        component: MultaconciDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multaconci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const multaconciPopupRoute: Routes = [
    {
        path: 'multaconci-new',
        component: MultaconciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multaconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multaconci/:id/edit',
        component: MultaconciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multaconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multaconci/:id/delete',
        component: MultaconciDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multaconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
