import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SrubroComponent } from './srubro.component';
import { SrubroDetailComponent } from './srubro-detail.component';
import { SrubroPopupComponent } from './srubro-dialog.component';
import { SrubroDeletePopupComponent } from './srubro-delete-dialog.component';

export const srubroRoute: Routes = [
    {
        path: 'srubro',
        component: SrubroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.srubro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'srubro/:id',
        component: SrubroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.srubro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const srubroPopupRoute: Routes = [
    {
        path: 'srubro-new',
        component: SrubroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.srubro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'srubro/:id/edit',
        component: SrubroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.srubro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'srubro/:id/delete',
        component: SrubroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.srubro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
