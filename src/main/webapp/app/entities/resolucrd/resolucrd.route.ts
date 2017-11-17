import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResolucrdComponent } from './resolucrd.component';
import { ResolucrdDetailComponent } from './resolucrd-detail.component';
import { ResolucrdPopupComponent } from './resolucrd-dialog.component';
import { ResolucrdDeletePopupComponent } from './resolucrd-delete-dialog.component';

export const resolucrdRoute: Routes = [
    {
        path: 'resolucrd',
        component: ResolucrdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolucrd.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resolucrd/:id',
        component: ResolucrdDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolucrd.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resolucrdPopupRoute: Routes = [
    {
        path: 'resolucrd-new',
        component: ResolucrdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolucrd.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resolucrd/:id/edit',
        component: ResolucrdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolucrd.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resolucrd/:id/delete',
        component: ResolucrdDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolucrd.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
