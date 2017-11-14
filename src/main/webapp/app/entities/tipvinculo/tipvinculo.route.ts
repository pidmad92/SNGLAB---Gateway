import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipvinculoComponent } from './tipvinculo.component';
import { TipvinculoDetailComponent } from './tipvinculo-detail.component';
import { TipvinculoPopupComponent } from './tipvinculo-dialog.component';
import { TipvinculoDeletePopupComponent } from './tipvinculo-delete-dialog.component';

export const tipvinculoRoute: Routes = [
    {
        path: 'tipvinculo',
        component: TipvinculoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvinculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipvinculo/:id',
        component: TipvinculoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvinculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipvinculoPopupRoute: Routes = [
    {
        path: 'tipvinculo-new',
        component: TipvinculoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvinculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipvinculo/:id/edit',
        component: TipvinculoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvinculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipvinculo/:id/delete',
        component: TipvinculoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipvinculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
