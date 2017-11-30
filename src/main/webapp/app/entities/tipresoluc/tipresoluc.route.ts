import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipresolucComponent } from './tipresoluc.component';
import { TipresolucDetailComponent } from './tipresoluc-detail.component';
import { TipresolucPopupComponent } from './tipresoluc-dialog.component';
import { TipresolucDeletePopupComponent } from './tipresoluc-delete-dialog.component';

export const tipresolucRoute: Routes = [
    {
        path: 'tipresoluc',
        component: TipresolucComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresoluc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipresoluc/:id',
        component: TipresolucDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresoluc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipresolucPopupRoute: Routes = [
    {
        path: 'tipresoluc-new',
        component: TipresolucPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresoluc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipresoluc/:id/edit',
        component: TipresolucPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresoluc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipresoluc/:id/delete',
        component: TipresolucDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipresoluc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
