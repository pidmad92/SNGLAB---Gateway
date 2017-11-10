import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TippersonaComponent } from './tippersona.component';
import { TippersonaDetailComponent } from './tippersona-detail.component';
import { TippersonaPopupComponent } from './tippersona-dialog.component';
import { TippersonaDeletePopupComponent } from './tippersona-delete-dialog.component';

export const tippersonaRoute: Routes = [
    {
        path: 'tippersona',
        component: TippersonaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tippersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tippersona/:id',
        component: TippersonaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tippersona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tippersonaPopupRoute: Routes = [
    {
        path: 'tippersona-new',
        component: TippersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tippersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tippersona/:id/edit',
        component: TippersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tippersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tippersona/:id/delete',
        component: TippersonaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tippersona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
