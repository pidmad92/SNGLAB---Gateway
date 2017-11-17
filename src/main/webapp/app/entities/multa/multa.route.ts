import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MultaComponent } from './multa.component';
import { MultaDetailComponent } from './multa-detail.component';
import { MultaPopupComponent } from './multa-dialog.component';
import { MultaDeletePopupComponent } from './multa-delete-dialog.component';

export const multaRoute: Routes = [
    {
        path: 'multa',
        component: MultaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'multa/:id',
        component: MultaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const multaPopupRoute: Routes = [
    {
        path: 'multa-new',
        component: MultaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multa/:id/edit',
        component: MultaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multa/:id/delete',
        component: MultaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.multa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
