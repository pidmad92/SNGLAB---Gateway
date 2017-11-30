import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CategoriaorComponent } from './categoriaor.component';
import { CategoriaorDetailComponent } from './categoriaor-detail.component';
import { CategoriaorPopupComponent } from './categoriaor-dialog.component';
import { CategoriaorDeletePopupComponent } from './categoriaor-delete-dialog.component';

export const categoriaorRoute: Routes = [
    {
        path: 'categoriaor',
        component: CategoriaorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.categoriaor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'categoriaor/:id',
        component: CategoriaorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.categoriaor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaorPopupRoute: Routes = [
    {
        path: 'categoriaor-new',
        component: CategoriaorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.categoriaor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoriaor/:id/edit',
        component: CategoriaorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.categoriaor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoriaor/:id/delete',
        component: CategoriaorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.categoriaor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
