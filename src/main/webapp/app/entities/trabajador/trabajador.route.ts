import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TrabajadorComponent } from './trabajador.component';
import { TrabajadorDetailComponent } from './trabajador-detail.component';
import { TrabajadorPopupComponent } from './trabajador-dialog.component';
import { TrabajadorDeletePopupComponent } from './trabajador-delete-dialog.component';

export const trabajadorRoute: Routes = [
    {
        path: 'trabajador',
        component: TrabajadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.trabajador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'trabajador/:id',
        component: TrabajadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.trabajador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trabajadorPopupRoute: Routes = [
    {
        path: 'trabajador-new',
        component: TrabajadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.trabajador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trabajador/:id/edit',
        component: TrabajadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.trabajador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trabajador/:id/delete',
        component: TrabajadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.trabajador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
