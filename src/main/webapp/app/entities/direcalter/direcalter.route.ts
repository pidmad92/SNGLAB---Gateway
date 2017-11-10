import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DirecalterComponent } from './direcalter.component';
import { DirecalterDetailComponent } from './direcalter-detail.component';
import { DirecalterPopupComponent } from './direcalter-dialog.component';
import { DirecalterDeletePopupComponent } from './direcalter-delete-dialog.component';

export const direcalterRoute: Routes = [
    {
        path: 'direcalter',
        component: DirecalterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcalter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'direcalter/:id',
        component: DirecalterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcalter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direcalterPopupRoute: Routes = [
    {
        path: 'direcalter-new',
        component: DirecalterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcalter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direcalter/:id/edit',
        component: DirecalterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcalter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direcalter/:id/delete',
        component: DirecalterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcalter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
