import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CargotrabajaComponent } from './cargotrabaja.component';
import { CargotrabajaDetailComponent } from './cargotrabaja-detail.component';
import { CargotrabajaPopupComponent } from './cargotrabaja-dialog.component';
import { CargotrabajaDeletePopupComponent } from './cargotrabaja-delete-dialog.component';

export const cargotrabajaRoute: Routes = [
    {
        path: 'cargotrabaja',
        component: CargotrabajaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cargotrabaja.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cargotrabaja/:id',
        component: CargotrabajaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cargotrabaja.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cargotrabajaPopupRoute: Routes = [
    {
        path: 'cargotrabaja-new',
        component: CargotrabajaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cargotrabaja.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargotrabaja/:id/edit',
        component: CargotrabajaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cargotrabaja.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cargotrabaja/:id/delete',
        component: CargotrabajaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cargotrabaja.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
