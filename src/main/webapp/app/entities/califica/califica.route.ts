import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalificaComponent } from './califica.component';
import { CalificaDetailComponent } from './califica-detail.component';
import { CalificaPopupComponent } from './califica-dialog.component';
import { CalificaDeletePopupComponent } from './califica-delete-dialog.component';

export const calificaRoute: Routes = [
    {
        path: 'califica',
        component: CalificaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.califica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'califica/:id',
        component: CalificaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.califica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calificaPopupRoute: Routes = [
    {
        path: 'califica-new',
        component: CalificaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.califica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'califica/:id/edit',
        component: CalificaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.califica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'califica/:id/delete',
        component: CalificaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.califica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
