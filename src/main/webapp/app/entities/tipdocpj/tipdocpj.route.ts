import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdocpjComponent } from './tipdocpj.component';
import { TipdocpjDetailComponent } from './tipdocpj-detail.component';
import { TipdocpjPopupComponent } from './tipdocpj-dialog.component';
import { TipdocpjDeletePopupComponent } from './tipdocpj-delete-dialog.component';

export const tipdocpjRoute: Routes = [
    {
        path: 'tipdocpj',
        component: TipdocpjComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocpj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdocpj/:id',
        component: TipdocpjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocpj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdocpjPopupRoute: Routes = [
    {
        path: 'tipdocpj-new',
        component: TipdocpjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocpj/:id/edit',
        component: TipdocpjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocpj/:id/delete',
        component: TipdocpjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
