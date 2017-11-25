import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipinteresComponent } from './tipinteres.component';
import { TipinteresDetailComponent } from './tipinteres-detail.component';
import { TipinteresPopupComponent } from './tipinteres-dialog.component';
import { TipinteresDeletePopupComponent } from './tipinteres-delete-dialog.component';

export const tipinteresRoute: Routes = [
    {
        path: 'tipinteres',
        component: TipinteresComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipinteres.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipinteres/:id',
        component: TipinteresDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipinteres.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipinteresPopupRoute: Routes = [
    {
        path: 'tipinteres-new',
        component: TipinteresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipinteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipinteres/:id/edit',
        component: TipinteresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipinteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipinteres/:id/delete',
        component: TipinteresDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipinteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
