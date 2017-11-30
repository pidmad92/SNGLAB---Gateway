import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { JuntadirectComponent } from './juntadirect.component';
import { JuntadirectDetailComponent } from './juntadirect-detail.component';
import { JuntadirectPopupComponent } from './juntadirect-dialog.component';
import { JuntadirectDeletePopupComponent } from './juntadirect-delete-dialog.component';

export const juntadirectRoute: Routes = [
    {
        path: 'juntadirect',
        component: JuntadirectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.juntadirect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'juntadirect/:id',
        component: JuntadirectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.juntadirect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const juntadirectPopupRoute: Routes = [
    {
        path: 'juntadirect-new',
        component: JuntadirectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.juntadirect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'juntadirect/:id/edit',
        component: JuntadirectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.juntadirect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'juntadirect/:id/delete',
        component: JuntadirectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.juntadirect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
