import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtenmotiatenComponent } from './atenmotiaten.component';
import { AtenmotiatenDetailComponent } from './atenmotiaten-detail.component';
import { AtenmotiatenPopupComponent } from './atenmotiaten-dialog.component';
import { AtenmotiatenDeletePopupComponent } from './atenmotiaten-delete-dialog.component';

export const atenmotiatenRoute: Routes = [
    {
        path: 'atenmotiaten',
        component: AtenmotiatenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenmotiaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atenmotiaten/:id',
        component: AtenmotiatenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenmotiaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atenmotiatenPopupRoute: Routes = [
    {
        path: 'atenmotiaten-new',
        component: AtenmotiatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenmotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atenmotiaten/:id/edit',
        component: AtenmotiatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenmotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atenmotiaten/:id/delete',
        component: AtenmotiatenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenmotiaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
