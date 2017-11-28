import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipcalconreComponent } from './tipcalconre.component';
import { TipcalconreDetailComponent } from './tipcalconre-detail.component';
import { TipcalconrePopupComponent } from './tipcalconre-dialog.component';
import { TipcalconreDeletePopupComponent } from './tipcalconre-delete-dialog.component';

export const tipcalconreRoute: Routes = [
    {
        path: 'tipcalconre',
        component: TipcalconreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalconre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipcalconre/:id',
        component: TipcalconreDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalconre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipcalconrePopupRoute: Routes = [
    {
        path: 'tipcalconre-new',
        component: TipcalconrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalconre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipcalconre/:id/edit',
        component: TipcalconrePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalconre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipcalconre/:id/delete',
        component: TipcalconreDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipcalconre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
