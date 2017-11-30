import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PasepjComponent } from './pasepj.component';
import { PasepjDetailComponent } from './pasepj-detail.component';
import { PasepjPopupComponent } from './pasepj-dialog.component';
import { PasepjDeletePopupComponent } from './pasepj-delete-dialog.component';

export const pasepjRoute: Routes = [
    {
        path: 'pasepj',
        component: PasepjComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasepj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pasepj/:id',
        component: PasepjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasepj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pasepjPopupRoute: Routes = [
    {
        path: 'pasepj-new',
        component: PasepjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasepj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasepj/:id/edit',
        component: PasepjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasepj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasepj/:id/delete',
        component: PasepjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasepj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
