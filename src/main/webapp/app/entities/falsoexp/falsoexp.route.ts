import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FalsoexpComponent } from './falsoexp.component';
import { FalsoexpDetailComponent } from './falsoexp-detail.component';
import { FalsoexpPopupComponent } from './falsoexp-dialog.component';
import { FalsoexpDeletePopupComponent } from './falsoexp-delete-dialog.component';

export const falsoexpRoute: Routes = [
    {
        path: 'falsoexp',
        component: FalsoexpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.falsoexp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'falsoexp/:id',
        component: FalsoexpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.falsoexp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const falsoexpPopupRoute: Routes = [
    {
        path: 'falsoexp-new',
        component: FalsoexpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.falsoexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'falsoexp/:id/edit',
        component: FalsoexpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.falsoexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'falsoexp/:id/delete',
        component: FalsoexpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.falsoexp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
