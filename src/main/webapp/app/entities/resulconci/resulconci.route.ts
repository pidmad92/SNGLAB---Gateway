import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResulconciComponent } from './resulconci.component';
import { ResulconciDetailComponent } from './resulconci-detail.component';
import { ResulconciPopupComponent } from './resulconci-dialog.component';
import { ResulconciDeletePopupComponent } from './resulconci-delete-dialog.component';

export const resulconciRoute: Routes = [
    {
        path: 'resulconci',
        component: ResulconciComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulconci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resulconci/:id',
        component: ResulconciDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulconci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resulconciPopupRoute: Routes = [
    {
        path: 'resulconci-new',
        component: ResulconciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resulconci/:id/edit',
        component: ResulconciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resulconci/:id/delete',
        component: ResulconciDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulconci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
