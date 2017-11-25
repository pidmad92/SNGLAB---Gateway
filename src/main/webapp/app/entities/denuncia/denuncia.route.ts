import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DenunciaComponent } from './denuncia.component';
import { DenunciaDetailComponent } from './denuncia-detail.component';
import { DenunciaPopupComponent } from './denuncia-dialog.component';
import { DenunciaDeletePopupComponent } from './denuncia-delete-dialog.component';

export const denunciaRoute: Routes = [
    {
        path: 'denuncia',
        component: DenunciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denuncia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'denuncia/:id',
        component: DenunciaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denuncia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const denunciaPopupRoute: Routes = [
    {
        path: 'denuncia-new',
        component: DenunciaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denuncia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denuncia/:id/edit',
        component: DenunciaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denuncia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'denuncia/:id/delete',
        component: DenunciaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.denuncia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
