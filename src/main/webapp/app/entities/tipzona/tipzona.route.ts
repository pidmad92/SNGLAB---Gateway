import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipzonaComponent } from './tipzona.component';
import { TipzonaDetailComponent } from './tipzona-detail.component';
import { TipzonaPopupComponent } from './tipzona-dialog.component';
import { TipzonaDeletePopupComponent } from './tipzona-delete-dialog.component';

export const tipzonaRoute: Routes = [
    {
        path: 'tipzona',
        component: TipzonaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipzona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipzona/:id',
        component: TipzonaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipzona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipzonaPopupRoute: Routes = [
    {
        path: 'tipzona-new',
        component: TipzonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipzona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipzona/:id/edit',
        component: TipzonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipzona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipzona/:id/delete',
        component: TipzonaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipzona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
