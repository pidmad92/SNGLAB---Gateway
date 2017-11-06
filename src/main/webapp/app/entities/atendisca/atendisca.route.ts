import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtendiscaComponent } from './atendisca.component';
import { AtendiscaDetailComponent } from './atendisca-detail.component';
import { AtendiscaPopupComponent } from './atendisca-dialog.component';
import { AtendiscaDeletePopupComponent } from './atendisca-delete-dialog.component';

export const atendiscaRoute: Routes = [
    {
        path: 'atendisca',
        component: AtendiscaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atendisca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atendisca/:id',
        component: AtendiscaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atendisca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atendiscaPopupRoute: Routes = [
    {
        path: 'atendisca-new',
        component: AtendiscaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atendisca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atendisca/:id/edit',
        component: AtendiscaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atendisca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atendisca/:id/delete',
        component: AtendiscaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atendisca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
