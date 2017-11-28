import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DatdenuComponent } from './datdenu.component';
import { DatdenuDetailComponent } from './datdenu-detail.component';
import { DatdenuPopupComponent } from './datdenu-dialog.component';
import { DatdenuDeletePopupComponent } from './datdenu-delete-dialog.component';

export const datdenuRoute: Routes = [
    {
        path: 'datdenu',
        component: DatdenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datdenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'datdenu/:id',
        component: DatdenuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datdenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datdenuPopupRoute: Routes = [
    {
        path: 'datdenu-new',
        component: DatdenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datdenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datdenu/:id/edit',
        component: DatdenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datdenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datdenu/:id/delete',
        component: DatdenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datdenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
