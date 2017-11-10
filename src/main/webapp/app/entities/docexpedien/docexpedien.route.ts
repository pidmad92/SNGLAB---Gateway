import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocexpedienComponent } from './docexpedien.component';
import { DocexpedienDetailComponent } from './docexpedien-detail.component';
import { DocexpedienPopupComponent } from './docexpedien-dialog.component';
import { DocexpedienDeletePopupComponent } from './docexpedien-delete-dialog.component';

export const docexpedienRoute: Routes = [
    {
        path: 'docexpedien',
        component: DocexpedienComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docexpedien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docexpedien/:id',
        component: DocexpedienDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docexpedien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docexpedienPopupRoute: Routes = [
    {
        path: 'docexpedien-new',
        component: DocexpedienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docexpedien/:id/edit',
        component: DocexpedienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docexpedien/:id/delete',
        component: DocexpedienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docexpedien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
