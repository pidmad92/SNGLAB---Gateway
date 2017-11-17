import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HoraComponent } from './hora.component';
import { HoraDetailComponent } from './hora-detail.component';
import { HoraPopupComponent } from './hora-dialog.component';
import { HoraDeletePopupComponent } from './hora-delete-dialog.component';

export const horaRoute: Routes = [
    {
        path: 'hora',
        component: HoraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hora.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hora/:id',
        component: HoraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hora.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horaPopupRoute: Routes = [
    {
        path: 'hora-new',
        component: HoraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hora/:id/edit',
        component: HoraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hora/:id/delete',
        component: HoraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.hora.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
