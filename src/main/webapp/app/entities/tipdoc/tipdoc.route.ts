import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipdocComponent } from './tipdoc.component';
import { TipdocDetailComponent } from './tipdoc-detail.component';
import { TipdocPopupComponent } from './tipdoc-dialog.component';
import { TipdocDeletePopupComponent } from './tipdoc-delete-dialog.component';

export const tipdocRoute: Routes = [
    {
        path: 'tipdoc',
        component: TipdocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipdoc/:id',
        component: TipdocDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipdocPopupRoute: Routes = [
    {
        path: 'tipdoc-new',
        component: TipdocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdoc/:id/edit',
        component: TipdocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipdoc/:id/delete',
        component: TipdocDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
