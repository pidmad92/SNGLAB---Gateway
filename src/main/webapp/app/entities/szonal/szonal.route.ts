import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SzonalComponent } from './szonal.component';
import { SzonalDetailComponent } from './szonal-detail.component';
import { SzonalPopupComponent } from './szonal-dialog.component';
import { SzonalDeletePopupComponent } from './szonal-delete-dialog.component';

export const szonalRoute: Routes = [
    {
        path: 'szonal',
        component: SzonalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.szonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'szonal/:id',
        component: SzonalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.szonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const szonalPopupRoute: Routes = [
    {
        path: 'szonal-new',
        component: SzonalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.szonal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'szonal/:id/edit',
        component: SzonalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.szonal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'szonal/:id/delete',
        component: SzonalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.szonal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
