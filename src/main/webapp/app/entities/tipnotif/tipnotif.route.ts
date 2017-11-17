import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipnotifComponent } from './tipnotif.component';
import { TipnotifDetailComponent } from './tipnotif-detail.component';
import { TipnotifPopupComponent } from './tipnotif-dialog.component';
import { TipnotifDeletePopupComponent } from './tipnotif-delete-dialog.component';

export const tipnotifRoute: Routes = [
    {
        path: 'tipnotif',
        component: TipnotifComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipnotif.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipnotif/:id',
        component: TipnotifDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipnotif.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipnotifPopupRoute: Routes = [
    {
        path: 'tipnotif-new',
        component: TipnotifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipnotif/:id/edit',
        component: TipnotifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipnotif/:id/delete',
        component: TipnotifDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
