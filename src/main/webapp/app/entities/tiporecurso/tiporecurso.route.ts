import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TiporecursoComponent } from './tiporecurso.component';
import { TiporecursoDetailComponent } from './tiporecurso-detail.component';
import { TiporecursoPopupComponent } from './tiporecurso-dialog.component';
import { TiporecursoDeletePopupComponent } from './tiporecurso-delete-dialog.component';

export const tiporecursoRoute: Routes = [
    {
        path: 'tiporecurso',
        component: TiporecursoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tiporecurso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tiporecurso/:id',
        component: TiporecursoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tiporecurso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tiporecursoPopupRoute: Routes = [
    {
        path: 'tiporecurso-new',
        component: TiporecursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tiporecurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tiporecurso/:id/edit',
        component: TiporecursoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tiporecurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tiporecurso/:id/delete',
        component: TiporecursoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tiporecurso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
