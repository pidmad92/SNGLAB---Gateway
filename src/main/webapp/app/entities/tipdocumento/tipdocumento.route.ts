import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdocumentoComponent } from './tipdocumento.component';
import { TipdocumentoDetailComponent } from './tipdocumento-detail.component';
import { TipdocumentoPopupComponent } from './tipdocumento-dialog.component';
import { TipdocumentoDeletePopupComponent } from './tipdocumento-delete-dialog.component';

export const tipdocumentoRoute: Routes = [
    {
        path: 'tipdocumento',
        component: TipdocumentoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdocumento/:id',
        component: TipdocumentoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocumento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdocumentoPopupRoute: Routes = [
    {
        path: 'tipdocumento-new',
        component: TipdocumentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocumento/:id/edit',
        component: TipdocumentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdocumento/:id/delete',
        component: TipdocumentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdocumento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
