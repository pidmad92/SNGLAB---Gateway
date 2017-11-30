import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LegajoComponent } from './legajo.component';
import { LegajoDetailComponent } from './legajo-detail.component';
import { LegajoPopupComponent } from './legajo-dialog.component';
import { LegajoDeletePopupComponent } from './legajo-delete-dialog.component';

export const legajoRoute: Routes = [
    {
        path: 'legajo',
        component: LegajoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'legajo/:id',
        component: LegajoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legajoPopupRoute: Routes = [
    {
        path: 'legajo-new',
        component: LegajoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legajo/:id/edit',
        component: LegajoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legajo/:id/delete',
        component: LegajoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
