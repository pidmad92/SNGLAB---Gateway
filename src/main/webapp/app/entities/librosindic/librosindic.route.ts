import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LibrosindicComponent } from './librosindic.component';
import { LibrosindicDetailComponent } from './librosindic-detail.component';
import { LibrosindicPopupComponent } from './librosindic-dialog.component';
import { LibrosindicDeletePopupComponent } from './librosindic-delete-dialog.component';

export const librosindicRoute: Routes = [
    {
        path: 'librosindic',
        component: LibrosindicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.librosindic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'librosindic/:id',
        component: LibrosindicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.librosindic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const librosindicPopupRoute: Routes = [
    {
        path: 'librosindic-new',
        component: LibrosindicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.librosindic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'librosindic/:id/edit',
        component: LibrosindicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.librosindic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'librosindic/:id/delete',
        component: LibrosindicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.librosindic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
