import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResolutorComponent } from './resolutor.component';
import { ResolutorDetailComponent } from './resolutor-detail.component';
import { ResolutorPopupComponent } from './resolutor-dialog.component';
import { ResolutorDeletePopupComponent } from './resolutor-delete-dialog.component';

export const resolutorRoute: Routes = [
    {
        path: 'resolutor',
        component: ResolutorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resolutor/:id',
        component: ResolutorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolutor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resolutorPopupRoute: Routes = [
    {
        path: 'resolutor-new',
        component: ResolutorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolutor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resolutor/:id/edit',
        component: ResolutorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolutor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resolutor/:id/delete',
        component: ResolutorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resolutor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
