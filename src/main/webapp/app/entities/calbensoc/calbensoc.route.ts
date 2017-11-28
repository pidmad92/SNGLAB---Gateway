import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalbensocComponent } from './calbensoc.component';
import { CalbensocDetailComponent } from './calbensoc-detail.component';
import { CalbensocPopupComponent } from './calbensoc-dialog.component';
import { CalbensocDeletePopupComponent } from './calbensoc-delete-dialog.component';

export const calbensocRoute: Routes = [
    {
        path: 'calbensoc',
        component: CalbensocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calbensoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calbensoc/:id',
        component: CalbensocDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calbensoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calbensocPopupRoute: Routes = [
    {
        path: 'calbensoc-new',
        component: CalbensocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calbensoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calbensoc/:id/edit',
        component: CalbensocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calbensoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calbensoc/:id/delete',
        component: CalbensocDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calbensoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
