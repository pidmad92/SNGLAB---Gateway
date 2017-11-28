import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocpresateComponent } from './docpresate.component';
import { DocpresateDetailComponent } from './docpresate-detail.component';
import { DocpresatePopupComponent } from './docpresate-dialog.component';
import { DocpresateDeletePopupComponent } from './docpresate-delete-dialog.component';

export const docpresateRoute: Routes = [
    {
        path: 'docpresate',
        component: DocpresateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docpresate/:id',
        component: DocpresateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docpresatePopupRoute: Routes = [
    {
        path: 'docpresate-new',
        component: DocpresatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docpresate/:id/edit',
        component: DocpresatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docpresate/:id/delete',
        component: DocpresateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
