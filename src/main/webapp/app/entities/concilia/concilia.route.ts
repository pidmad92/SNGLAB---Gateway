import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConciliaComponent } from './concilia.component';
import { ConciliaDetailComponent } from './concilia-detail.component';
import { ConciliaPopupComponent } from './concilia-dialog.component';
import { ConciliaDeletePopupComponent } from './concilia-delete-dialog.component';

export const conciliaRoute: Routes = [
    {
        path: 'concilia',
        component: ConciliaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.concilia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'concilia/:id',
        component: ConciliaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.concilia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conciliaPopupRoute: Routes = [
    {
        path: 'concilia-new',
        component: ConciliaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.concilia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'concilia/:id/edit',
        component: ConciliaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.concilia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'concilia/:id/delete',
        component: ConciliaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.concilia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
