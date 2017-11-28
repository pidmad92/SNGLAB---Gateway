import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnexlaboralComponent } from './anexlaboral.component';
import { AnexlaboralDetailComponent } from './anexlaboral-detail.component';
import { AnexlaboralPopupComponent } from './anexlaboral-dialog.component';
import { AnexlaboralDeletePopupComponent } from './anexlaboral-delete-dialog.component';

export const anexlaboralRoute: Routes = [
    {
        path: 'anexlaboral',
        component: AnexlaboralComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.anexlaboral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'anexlaboral/:id',
        component: AnexlaboralDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.anexlaboral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anexlaboralPopupRoute: Routes = [
    {
        path: 'anexlaboral-new',
        component: AnexlaboralPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.anexlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anexlaboral/:id/edit',
        component: AnexlaboralPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.anexlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anexlaboral/:id/delete',
        component: AnexlaboralDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.anexlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
