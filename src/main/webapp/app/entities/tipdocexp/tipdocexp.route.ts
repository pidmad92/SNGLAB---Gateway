import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdocexpComponent } from './tipdocexp.component';
import { TipdocexpDetailComponent } from './tipdocexp-detail.component';
import { TipdocexpPopupComponent } from './tipdocexp-dialog.component';
import { TipdocexpDeletePopupComponent } from './tipdocexp-delete-dialog.component';

export const tipdocexpRoute: Routes = [
    {
        path: 'tipdocexp',
        component: TipdocexpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocexp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdocexp/:id',
        component: TipdocexpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocexp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdocexpPopupRoute: Routes = [
    {
        path: 'tipdocexp-new',
        component: TipdocexpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocexp/:id/edit',
        component: TipdocexpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocexp/:id/delete',
        component: TipdocexpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
