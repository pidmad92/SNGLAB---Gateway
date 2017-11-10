import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionComponent } from './atencion.component';
import { AtencionDetailComponent } from './atencion-detail.component';
import { AtencionPopupComponent } from './atencion-dialog.component';
import { AtencionDeletePopupComponent } from './atencion-delete-dialog.component';

export const atencionRoute: Routes = [
    {
        path: 'atencion',
        component: AtencionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atencion/:id',
        component: AtencionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atencionPopupRoute: Routes = [
    {
        path: 'atencion-new',
        component: AtencionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atencion/:id/edit',
        component: AtencionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atencion/:id/delete',
        component: AtencionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
