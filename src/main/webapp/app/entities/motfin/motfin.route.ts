import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotfinComponent } from './motfin.component';
import { MotfinDetailComponent } from './motfin-detail.component';
import { MotfinPopupComponent } from './motfin-dialog.component';
import { MotfinDeletePopupComponent } from './motfin-delete-dialog.component';

export const motfinRoute: Routes = [
    {
        path: 'motfin',
        component: MotfinComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motfin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motfin/:id',
        component: MotfinDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motfin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motfinPopupRoute: Routes = [
    {
        path: 'motfin-new',
        component: MotfinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motfin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motfin/:id/edit',
        component: MotfinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motfin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motfin/:id/delete',
        component: MotfinDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motfin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
