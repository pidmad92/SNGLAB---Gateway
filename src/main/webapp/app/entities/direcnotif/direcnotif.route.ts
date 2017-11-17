import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DirecnotifComponent } from './direcnotif.component';
import { DirecnotifDetailComponent } from './direcnotif-detail.component';
import { DirecnotifPopupComponent } from './direcnotif-dialog.component';
import { DirecnotifDeletePopupComponent } from './direcnotif-delete-dialog.component';

export const direcnotifRoute: Routes = [
    {
        path: 'direcnotif',
        component: DirecnotifComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcnotif.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'direcnotif/:id',
        component: DirecnotifDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcnotif.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direcnotifPopupRoute: Routes = [
    {
        path: 'direcnotif-new',
        component: DirecnotifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direcnotif/:id/edit',
        component: DirecnotifPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direcnotif/:id/delete',
        component: DirecnotifDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.direcnotif.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
