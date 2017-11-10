import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OficinaComponent } from './oficina.component';
import { OficinaDetailComponent } from './oficina-detail.component';
import { OficinaPopupComponent } from './oficina-dialog.component';
import { OficinaDeletePopupComponent } from './oficina-delete-dialog.component';

export const oficinaRoute: Routes = [
    {
        path: 'oficina',
        component: OficinaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oficina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'oficina/:id',
        component: OficinaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oficina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const oficinaPopupRoute: Routes = [
    {
        path: 'oficina-new',
        component: OficinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oficina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'oficina/:id/edit',
        component: OficinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oficina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'oficina/:id/delete',
        component: OficinaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oficina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
