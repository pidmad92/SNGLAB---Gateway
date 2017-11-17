import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConciliacionComponent } from './conciliacion.component';
import { ConciliacionDetailComponent } from './conciliacion-detail.component';
import { ConciliacionPopupComponent } from './conciliacion-dialog.component';
import { ConciliacionDeletePopupComponent } from './conciliacion-delete-dialog.component';

export const conciliacionRoute: Routes = [
    {
        path: 'conciliacion',
        component: ConciliacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conciliacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conciliacion/:id',
        component: ConciliacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conciliacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conciliacionPopupRoute: Routes = [
    {
        path: 'conciliacion-new',
        component: ConciliacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conciliacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conciliacion/:id/edit',
        component: ConciliacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conciliacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conciliacion/:id/delete',
        component: ConciliacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.conciliacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
