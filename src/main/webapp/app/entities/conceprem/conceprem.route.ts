import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConcepremComponent } from './conceprem.component';
import { ConcepremDetailComponent } from './conceprem-detail.component';
import { ConcepremPopupComponent } from './conceprem-dialog.component';
import { ConcepremDeletePopupComponent } from './conceprem-delete-dialog.component';

export const concepremRoute: Routes = [
    {
        path: 'conceprem',
        component: ConcepremComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conceprem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conceprem/:id',
        component: ConcepremDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conceprem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const concepremPopupRoute: Routes = [
    {
        path: 'conceprem-new',
        component: ConcepremPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conceprem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conceprem/:id/edit',
        component: ConcepremPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conceprem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conceprem/:id/delete',
        component: ConcepremDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conceprem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
