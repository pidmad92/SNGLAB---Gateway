import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PernatudireComponent } from './pernatudire.component';
import { PernatudireDetailComponent } from './pernatudire-detail.component';
import { PernatudirePopupComponent } from './pernatudire-dialog.component';
import { PernatudireDeletePopupComponent } from './pernatudire-delete-dialog.component';

export const pernatudireRoute: Routes = [
    {
        path: 'pernatudire',
        component: PernatudireComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatudire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pernatudire/:id',
        component: PernatudireDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatudire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pernatudirePopupRoute: Routes = [
    {
        path: 'pernatudire-new',
        component: PernatudirePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatudire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pernatudire/:id/edit',
        component: PernatudirePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatudire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pernatudire/:id/delete',
        component: PernatudireDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatudire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
