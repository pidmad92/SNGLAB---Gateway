import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HoraconComponent } from './horacon.component';
import { HoraconDetailComponent } from './horacon-detail.component';
import { HoraconPopupComponent } from './horacon-dialog.component';
import { HoraconDeletePopupComponent } from './horacon-delete-dialog.component';

export const horaconRoute: Routes = [
    {
        path: 'horacon',
        component: HoraconComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.horacon.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'horacon/:id',
        component: HoraconDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.horacon.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const horaconPopupRoute: Routes = [
    {
        path: 'horacon-new',
        component: HoraconPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.horacon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'horacon/:id/edit',
        component: HoraconPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.horacon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'horacon/:id/delete',
        component: HoraconDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.horacon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
