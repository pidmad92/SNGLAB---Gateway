import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipcalperiComponent } from './tipcalperi.component';
import { TipcalperiDetailComponent } from './tipcalperi-detail.component';
import { TipcalperiPopupComponent } from './tipcalperi-dialog.component';
import { TipcalperiDeletePopupComponent } from './tipcalperi-delete-dialog.component';

export const tipcalperiRoute: Routes = [
    {
        path: 'tipcalperi',
        component: TipcalperiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipcalperi/:id',
        component: TipcalperiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipcalperiPopupRoute: Routes = [
    {
        path: 'tipcalperi-new',
        component: TipcalperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipcalperi/:id/edit',
        component: TipcalperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipcalperi/:id/delete',
        component: TipcalperiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
