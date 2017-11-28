import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ReporteresComponent } from './reporteres.component';
import { ReporteresDetailComponent } from './reporteres-detail.component';
import { ReporteresPopupComponent } from './reporteres-dialog.component';
import { ReporteresDeletePopupComponent } from './reporteres-delete-dialog.component';

export const reporteresRoute: Routes = [
    {
        path: 'reporteres',
        component: ReporteresComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reporteres.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reporteres/:id',
        component: ReporteresDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reporteres.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reporteresPopupRoute: Routes = [
    {
        path: 'reporteres-new',
        component: ReporteresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reporteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reporteres/:id/edit',
        component: ReporteresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reporteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reporteres/:id/delete',
        component: ReporteresDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reporteres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
