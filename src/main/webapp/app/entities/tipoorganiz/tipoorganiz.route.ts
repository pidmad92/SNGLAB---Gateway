import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoorganizComponent } from './tipoorganiz.component';
import { TipoorganizDetailComponent } from './tipoorganiz-detail.component';
import { TipoorganizPopupComponent } from './tipoorganiz-dialog.component';
import { TipoorganizDeletePopupComponent } from './tipoorganiz-delete-dialog.component';

export const tipoorganizRoute: Routes = [
    {
        path: 'tipoorganiz',
        component: TipoorganizComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoorganiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipoorganiz/:id',
        component: TipoorganizDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoorganiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoorganizPopupRoute: Routes = [
    {
        path: 'tipoorganiz-new',
        component: TipoorganizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoorganiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipoorganiz/:id/edit',
        component: TipoorganizPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoorganiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipoorganiz/:id/delete',
        component: TipoorganizDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoorganiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
