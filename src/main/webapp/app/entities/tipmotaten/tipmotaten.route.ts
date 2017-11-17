import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipmotatenComponent } from './tipmotaten.component';
import { TipmotatenDetailComponent } from './tipmotaten-detail.component';
import { TipmotatenPopupComponent } from './tipmotaten-dialog.component';
import { TipmotatenDeletePopupComponent } from './tipmotaten-delete-dialog.component';

export const tipmotatenRoute: Routes = [
    {
        path: 'tipmotaten',
        component: TipmotatenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipmotaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipmotaten/:id',
        component: TipmotatenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipmotaten.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipmotatenPopupRoute: Routes = [
    {
        path: 'tipmotaten-new',
        component: TipmotatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipmotaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipmotaten/:id/edit',
        component: TipmotatenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipmotaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipmotaten/:id/delete',
        component: TipmotatenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipmotaten.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
