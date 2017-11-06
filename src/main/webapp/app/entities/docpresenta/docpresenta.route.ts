import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocpresentaComponent } from './docpresenta.component';
import { DocpresentaDetailComponent } from './docpresenta-detail.component';
import { DocpresentaPopupComponent } from './docpresenta-dialog.component';
import { DocpresentaDeletePopupComponent } from './docpresenta-delete-dialog.component';

export const docpresentaRoute: Routes = [
    {
        path: 'docpresenta',
        component: DocpresentaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresenta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docpresenta/:id',
        component: DocpresentaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresenta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docpresentaPopupRoute: Routes = [
    {
        path: 'docpresenta-new',
        component: DocpresentaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresenta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docpresenta/:id/edit',
        component: DocpresentaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresenta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docpresenta/:id/delete',
        component: DocpresentaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docpresenta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
