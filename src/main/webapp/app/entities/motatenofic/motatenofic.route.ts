import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotatenoficComponent } from './motatenofic.component';
import { MotatenoficDetailComponent } from './motatenofic-detail.component';
import { MotatenoficPopupComponent } from './motatenofic-dialog.component';
import { MotatenoficDeletePopupComponent } from './motatenofic-delete-dialog.component';

export const motatenoficRoute: Routes = [
    {
        path: 'motatenofic',
        component: MotatenoficComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motatenofic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motatenofic/:id',
        component: MotatenoficDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motatenofic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motatenoficPopupRoute: Routes = [
    {
        path: 'motatenofic-new',
        component: MotatenoficPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motatenofic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motatenofic/:id/edit',
        component: MotatenoficPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motatenofic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motatenofic/:id/delete',
        component: MotatenoficDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motatenofic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
