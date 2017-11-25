import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NegocolectComponent } from './negocolect.component';
import { NegocolectDetailComponent } from './negocolect-detail.component';
import { NegocolectPopupComponent } from './negocolect-dialog.component';
import { NegocolectDeletePopupComponent } from './negocolect-delete-dialog.component';

export const negocolectRoute: Routes = [
    {
        path: 'negocolect',
        component: NegocolectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.negocolect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'negocolect/:id',
        component: NegocolectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.negocolect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const negocolectPopupRoute: Routes = [
    {
        path: 'negocolect-new',
        component: NegocolectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.negocolect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'negocolect/:id/edit',
        component: NegocolectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.negocolect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'negocolect/:id/delete',
        component: NegocolectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.negocolect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
