import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipolibroComponent } from './tipolibro.component';
import { TipolibroDetailComponent } from './tipolibro-detail.component';
import { TipolibroPopupComponent } from './tipolibro-dialog.component';
import { TipolibroDeletePopupComponent } from './tipolibro-delete-dialog.component';

export const tipolibroRoute: Routes = [
    {
        path: 'tipolibro',
        component: TipolibroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipolibro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipolibro/:id',
        component: TipolibroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipolibro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipolibroPopupRoute: Routes = [
    {
        path: 'tipolibro-new',
        component: TipolibroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipolibro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipolibro/:id/edit',
        component: TipolibroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipolibro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipolibro/:id/delete',
        component: TipolibroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipolibro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
