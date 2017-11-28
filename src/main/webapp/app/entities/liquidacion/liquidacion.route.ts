import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LiquidacionComponent } from './liquidacion.component';
import { LiquidacionDetailComponent } from './liquidacion-detail.component';
import { LiquidacionPopupComponent } from './liquidacion-dialog.component';
import { LiquidacionDeletePopupComponent } from './liquidacion-delete-dialog.component';

export const liquidacionRoute: Routes = [
    {
        path: 'liquidacion',
        component: LiquidacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.liquidacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'liquidacion/:id',
        component: LiquidacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.liquidacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const liquidacionPopupRoute: Routes = [
    {
        path: 'liquidacion-new',
        component: LiquidacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.liquidacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'liquidacion/:id/edit',
        component: LiquidacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.liquidacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'liquidacion/:id/delete',
        component: LiquidacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.liquidacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
