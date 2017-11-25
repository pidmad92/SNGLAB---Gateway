import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HechoinverComponent } from './hechoinver.component';
import { HechoinverDetailComponent } from './hechoinver-detail.component';
import { HechoinverPopupComponent } from './hechoinver-dialog.component';
import { HechoinverDeletePopupComponent } from './hechoinver-delete-dialog.component';

export const hechoinverRoute: Routes = [
    {
        path: 'hechoinver',
        component: HechoinverComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hechoinver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hechoinver/:id',
        component: HechoinverDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hechoinver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hechoinverPopupRoute: Routes = [
    {
        path: 'hechoinver-new',
        component: HechoinverPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hechoinver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hechoinver/:id/edit',
        component: HechoinverPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hechoinver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hechoinver/:id/delete',
        component: HechoinverDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hechoinver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
