import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrganizacioComponent } from './organizacio.component';
import { OrganizacioDetailComponent } from './organizacio-detail.component';
import { OrganizacioPopupComponent } from './organizacio-dialog.component';
import { OrganizacioDeletePopupComponent } from './organizacio-delete-dialog.component';

export const organizacioRoute: Routes = [
    {
        path: 'organizacio',
        component: OrganizacioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.organizacio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organizacio/:id',
        component: OrganizacioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.organizacio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizacioPopupRoute: Routes = [
    {
        path: 'organizacio-new',
        component: OrganizacioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.organizacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organizacio/:id/edit',
        component: OrganizacioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.organizacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organizacio/:id/delete',
        component: OrganizacioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.organizacio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
