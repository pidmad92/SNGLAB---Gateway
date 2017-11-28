import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SolicformComponent } from './solicform.component';
import { SolicformDetailComponent } from './solicform-detail.component';
import { SolicformPopupComponent } from './solicform-dialog.component';
import { SolicformDeletePopupComponent } from './solicform-delete-dialog.component';

export const solicformRoute: Routes = [
    {
        path: 'solicform',
        component: SolicformComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'solicform/:id',
        component: SolicformDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicformPopupRoute: Routes = [
    {
        path: 'solicform-new',
        component: SolicformPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicform/:id/edit',
        component: SolicformPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicform/:id/delete',
        component: SolicformDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
