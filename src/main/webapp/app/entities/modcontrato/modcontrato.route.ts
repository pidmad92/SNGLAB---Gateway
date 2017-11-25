import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModcontratoComponent } from './modcontrato.component';
import { ModcontratoDetailComponent } from './modcontrato-detail.component';
import { ModcontratoPopupComponent } from './modcontrato-dialog.component';
import { ModcontratoDeletePopupComponent } from './modcontrato-delete-dialog.component';

export const modcontratoRoute: Routes = [
    {
        path: 'modcontrato',
        component: ModcontratoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modcontrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modcontrato/:id',
        component: ModcontratoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modcontrato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modcontratoPopupRoute: Routes = [
    {
        path: 'modcontrato-new',
        component: ModcontratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modcontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modcontrato/:id/edit',
        component: ModcontratoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modcontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modcontrato/:id/delete',
        component: ModcontratoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modcontrato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
