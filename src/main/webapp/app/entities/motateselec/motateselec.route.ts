import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotateselecComponent } from './motateselec.component';
import { MotateselecDetailComponent } from './motateselec-detail.component';
import { MotateselecPopupComponent } from './motateselec-dialog.component';
import { MotateselecDeletePopupComponent } from './motateselec-delete-dialog.component';

export const motateselecRoute: Routes = [
    {
        path: 'motateselec',
        component: MotateselecComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motateselec.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motateselec/:id',
        component: MotateselecDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motateselec.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motateselecPopupRoute: Routes = [
    {
        path: 'motateselec-new',
        component: MotateselecPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motateselec.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motateselec/:id/edit',
        component: MotateselecPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motateselec.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motateselec/:id/delete',
        component: MotateselecDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motateselec.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
