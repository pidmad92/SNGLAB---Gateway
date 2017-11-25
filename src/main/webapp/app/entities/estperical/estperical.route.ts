import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstpericalComponent } from './estperical.component';
import { EstpericalDetailComponent } from './estperical-detail.component';
import { EstpericalPopupComponent } from './estperical-dialog.component';
import { EstpericalDeletePopupComponent } from './estperical-delete-dialog.component';

export const estpericalRoute: Routes = [
    {
        path: 'estperical',
        component: EstpericalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estperical.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estperical/:id',
        component: EstpericalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estperical.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estpericalPopupRoute: Routes = [
    {
        path: 'estperical-new',
        component: EstpericalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estperical.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estperical/:id/edit',
        component: EstpericalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estperical.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estperical/:id/delete',
        component: EstpericalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estperical.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
