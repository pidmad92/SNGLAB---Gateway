import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DelegadoComponent } from './delegado.component';
import { DelegadoDetailComponent } from './delegado-detail.component';
import { DelegadoPopupComponent } from './delegado-dialog.component';
import { DelegadoDeletePopupComponent } from './delegado-delete-dialog.component';

export const delegadoRoute: Routes = [
    {
        path: 'delegado',
        component: DelegadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.delegado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delegado/:id',
        component: DelegadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.delegado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const delegadoPopupRoute: Routes = [
    {
        path: 'delegado-new',
        component: DelegadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.delegado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delegado/:id/edit',
        component: DelegadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.delegado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delegado/:id/delete',
        component: DelegadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.delegado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
