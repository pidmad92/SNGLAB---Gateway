import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PaseglComponent } from './pasegl.component';
import { PaseglDetailComponent } from './pasegl-detail.component';
import { PaseglPopupComponent } from './pasegl-dialog.component';
import { PaseglDeletePopupComponent } from './pasegl-delete-dialog.component';

export const paseglRoute: Routes = [
    {
        path: 'pasegl',
        component: PaseglComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasegl.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pasegl/:id',
        component: PaseglDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasegl.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paseglPopupRoute: Routes = [
    {
        path: 'pasegl-new',
        component: PaseglPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasegl.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasegl/:id/edit',
        component: PaseglPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasegl.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pasegl/:id/delete',
        component: PaseglDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pasegl.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
