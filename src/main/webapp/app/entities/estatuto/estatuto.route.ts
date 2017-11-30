import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstatutoComponent } from './estatuto.component';
import { EstatutoDetailComponent } from './estatuto-detail.component';
import { EstatutoPopupComponent } from './estatuto-dialog.component';
import { EstatutoDeletePopupComponent } from './estatuto-delete-dialog.component';

export const estatutoRoute: Routes = [
    {
        path: 'estatuto',
        component: EstatutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estatuto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estatuto/:id',
        component: EstatutoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estatuto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estatutoPopupRoute: Routes = [
    {
        path: 'estatuto-new',
        component: EstatutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estatuto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatuto/:id/edit',
        component: EstatutoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estatuto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatuto/:id/delete',
        component: EstatutoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.estatuto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
