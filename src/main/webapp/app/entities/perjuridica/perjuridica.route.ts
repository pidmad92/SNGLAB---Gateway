import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PerjuridicaComponent } from './perjuridica.component';
import { PerjuridicaDetailComponent } from './perjuridica-detail.component';
import { PerjuridicaPopupComponent } from './perjuridica-dialog.component';
import { PerjuridicaDeletePopupComponent } from './perjuridica-delete-dialog.component';

export const perjuridicaRoute: Routes = [
    {
        path: 'perjuridica',
        component: PerjuridicaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'perjuridica/:id',
        component: PerjuridicaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perjuridicaPopupRoute: Routes = [
    {
        path: 'perjuridica-new',
        component: PerjuridicaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perjuridica/:id/edit',
        component: PerjuridicaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perjuridica/:id/delete',
        component: PerjuridicaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perjuridica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
