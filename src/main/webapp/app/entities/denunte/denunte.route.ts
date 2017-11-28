import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DenunteComponent } from './denunte.component';
import { DenunteDetailComponent } from './denunte-detail.component';
import { DenuntePopupComponent } from './denunte-dialog.component';
import { DenunteDeletePopupComponent } from './denunte-delete-dialog.component';

export const denunteRoute: Routes = [
    {
        path: 'denunte',
        component: DenunteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denunte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'denunte/:id',
        component: DenunteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denunte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const denuntePopupRoute: Routes = [
    {
        path: 'denunte-new',
        component: DenuntePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denunte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denunte/:id/edit',
        component: DenuntePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denunte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denunte/:id/delete',
        component: DenunteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denunte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
