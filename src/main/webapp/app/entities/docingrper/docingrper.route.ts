import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocingrperComponent } from './docingrper.component';
import { DocingrperDetailComponent } from './docingrper-detail.component';
import { DocingrperPopupComponent } from './docingrper-dialog.component';
import { DocingrperDeletePopupComponent } from './docingrper-delete-dialog.component';

export const docingrperRoute: Routes = [
    {
        path: 'docingrper',
        component: DocingrperComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingrper.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docingrper/:id',
        component: DocingrperDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingrper.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docingrperPopupRoute: Routes = [
    {
        path: 'docingrper-new',
        component: DocingrperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingrper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docingrper/:id/edit',
        component: DocingrperPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingrper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docingrper/:id/delete',
        component: DocingrperDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingrper.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
