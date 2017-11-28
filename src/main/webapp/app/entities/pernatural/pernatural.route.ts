import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PernaturalComponent } from './pernatural.component';
import { PernaturalDetailComponent } from './pernatural-detail.component';
import { PernaturalPopupComponent } from './pernatural-dialog.component';
import { PernaturalDeletePopupComponent } from './pernatural-delete-dialog.component';

export const pernaturalRoute: Routes = [
    {
        path: 'pernatural',
        component: PernaturalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatural.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pernatural/:id',
        component: PernaturalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatural.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pernaturalPopupRoute: Routes = [
    {
        path: 'pernatural-new',
        component: PernaturalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatural.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pernatural/:id/edit',
        component: PernaturalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatural.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pernatural/:id/delete',
        component: PernaturalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pernatural.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
