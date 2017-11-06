import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdocidentComponent } from './tipdocident.component';
import { TipdocidentDetailComponent } from './tipdocident-detail.component';
import { TipdocidentPopupComponent } from './tipdocident-dialog.component';
import { TipdocidentDeletePopupComponent } from './tipdocident-delete-dialog.component';

export const tipdocidentRoute: Routes = [
    {
        path: 'tipdocident',
        component: TipdocidentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdocident/:id',
        component: TipdocidentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdocidentPopupRoute: Routes = [
    {
        path: 'tipdocident-new',
        component: TipdocidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocident/:id/edit',
        component: TipdocidentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocident/:id/delete',
        component: TipdocidentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
