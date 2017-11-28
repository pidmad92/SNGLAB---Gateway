import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipviaComponent } from './tipvia.component';
import { TipviaDetailComponent } from './tipvia-detail.component';
import { TipviaPopupComponent } from './tipvia-dialog.component';
import { TipviaDeletePopupComponent } from './tipvia-delete-dialog.component';

export const tipviaRoute: Routes = [
    {
        path: 'tipvia',
        component: TipviaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipvia/:id',
        component: TipviaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipviaPopupRoute: Routes = [
    {
        path: 'tipvia-new',
        component: TipviaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipvia/:id/edit',
        component: TipviaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipvia/:id/delete',
        component: TipviaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
