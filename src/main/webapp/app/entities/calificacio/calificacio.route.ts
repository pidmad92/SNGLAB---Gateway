import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalificacioComponent } from './calificacio.component';
import { CalificacioDetailComponent } from './calificacio-detail.component';
import { CalificacioPopupComponent } from './calificacio-dialog.component';
import { CalificacioDeletePopupComponent } from './calificacio-delete-dialog.component';

export const calificacioRoute: Routes = [
    {
        path: 'calificacio',
        component: CalificacioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calificacio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calificacio/:id',
        component: CalificacioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calificacio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calificacioPopupRoute: Routes = [
    {
        path: 'calificacio-new',
        component: CalificacioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calificacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calificacio/:id/edit',
        component: CalificacioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calificacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calificacio/:id/delete',
        component: CalificacioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calificacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
