import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PerjuridireComponent } from './perjuridire.component';
import { PerjuridireDetailComponent } from './perjuridire-detail.component';
import { PerjuridirePopupComponent } from './perjuridire-dialog.component';
import { PerjuridireDeletePopupComponent } from './perjuridire-delete-dialog.component';

export const perjuridireRoute: Routes = [
    {
        path: 'perjuridire',
        component: PerjuridireComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'perjuridire/:id',
        component: PerjuridireDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perjuridirePopupRoute: Routes = [
    {
        path: 'perjuridire-new',
        component: PerjuridirePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perjuridire/:id/edit',
        component: PerjuridirePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perjuridire/:id/delete',
        component: PerjuridireDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
