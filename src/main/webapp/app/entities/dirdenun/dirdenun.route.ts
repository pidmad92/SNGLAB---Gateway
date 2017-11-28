import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DirdenunComponent } from './dirdenun.component';
import { DirdenunDetailComponent } from './dirdenun-detail.component';
import { DirdenunPopupComponent } from './dirdenun-dialog.component';
import { DirdenunDeletePopupComponent } from './dirdenun-delete-dialog.component';

export const dirdenunRoute: Routes = [
    {
        path: 'dirdenun',
        component: DirdenunComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirdenun.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dirdenun/:id',
        component: DirdenunDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirdenun.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dirdenunPopupRoute: Routes = [
    {
        path: 'dirdenun-new',
        component: DirdenunPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirdenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirdenun/:id/edit',
        component: DirdenunPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirdenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirdenun/:id/delete',
        component: DirdenunDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirdenun.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
