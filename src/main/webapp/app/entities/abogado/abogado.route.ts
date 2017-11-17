import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AbogadoComponent } from './abogado.component';
import { AbogadoDetailComponent } from './abogado-detail.component';
import { AbogadoPopupComponent } from './abogado-dialog.component';
import { AbogadoDeletePopupComponent } from './abogado-delete-dialog.component';

export const abogadoRoute: Routes = [
    {
        path: 'abogado',
        component: AbogadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.abogado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'abogado/:id',
        component: AbogadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.abogado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const abogadoPopupRoute: Routes = [
    {
        path: 'abogado-new',
        component: AbogadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.abogado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abogado/:id/edit',
        component: AbogadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.abogado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abogado/:id/delete',
        component: AbogadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.abogado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
