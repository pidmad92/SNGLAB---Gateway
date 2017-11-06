import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PaseComponent } from './pase.component';
import { PaseDetailComponent } from './pase-detail.component';
import { PasePopupComponent } from './pase-dialog.component';
import { PaseDeletePopupComponent } from './pase-delete-dialog.component';

export const paseRoute: Routes = [
    {
        path: 'pase',
        component: PaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pase/:id',
        component: PaseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pasePopupRoute: Routes = [
    {
        path: 'pase-new',
        component: PasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pase/:id/edit',
        component: PasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pase/:id/delete',
        component: PaseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
