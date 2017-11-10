import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DlabingpercComponent } from './dlabingperc.component';
import { DlabingpercDetailComponent } from './dlabingperc-detail.component';
import { DlabingpercPopupComponent } from './dlabingperc-dialog.component';
import { DlabingpercDeletePopupComponent } from './dlabingperc-delete-dialog.component';

export const dlabingpercRoute: Routes = [
    {
        path: 'dlabingperc',
        component: DlabingpercComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dlabingperc/:id',
        component: DlabingpercDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dlabingpercPopupRoute: Routes = [
    {
        path: 'dlabingperc-new',
        component: DlabingpercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dlabingperc/:id/edit',
        component: DlabingpercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dlabingperc/:id/delete',
        component: DlabingpercDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
