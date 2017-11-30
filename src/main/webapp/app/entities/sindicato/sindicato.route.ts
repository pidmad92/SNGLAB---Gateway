import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SindicatoComponent } from './sindicato.component';
import { SindicatoDetailComponent } from './sindicato-detail.component';
import { SindicatoPopupComponent } from './sindicato-dialog.component';
import { SindicatoDeletePopupComponent } from './sindicato-delete-dialog.component';

export const sindicatoRoute: Routes = [
    {
        path: 'sindicato',
        component: SindicatoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sindicato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sindicato/:id',
        component: SindicatoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sindicato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sindicatoPopupRoute: Routes = [
    {
        path: 'sindicato-new',
        component: SindicatoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sindicato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sindicato/:id/edit',
        component: SindicatoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sindicato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sindicato/:id/delete',
        component: SindicatoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sindicato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
