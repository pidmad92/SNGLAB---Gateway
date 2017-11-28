import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotidenunComponent } from './motidenun.component';
import { MotidenunDetailComponent } from './motidenun-detail.component';
import { MotidenunPopupComponent } from './motidenun-dialog.component';
import { MotidenunDeletePopupComponent } from './motidenun-delete-dialog.component';

export const motidenunRoute: Routes = [
    {
        path: 'motidenun',
        component: MotidenunComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motidenun.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motidenun/:id',
        component: MotidenunDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motidenun.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motidenunPopupRoute: Routes = [
    {
        path: 'motidenun-new',
        component: MotidenunPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motidenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motidenun/:id/edit',
        component: MotidenunPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motidenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motidenun/:id/delete',
        component: MotidenunDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motidenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
