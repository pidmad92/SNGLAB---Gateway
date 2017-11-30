import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AfiliadoComponent } from './afiliado.component';
import { AfiliadoDetailComponent } from './afiliado-detail.component';
import { AfiliadoPopupComponent } from './afiliado-dialog.component';
import { AfiliadoDeletePopupComponent } from './afiliado-delete-dialog.component';

export const afiliadoRoute: Routes = [
    {
        path: 'afiliado',
        component: AfiliadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.afiliado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'afiliado/:id',
        component: AfiliadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.afiliado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const afiliadoPopupRoute: Routes = [
    {
        path: 'afiliado-new',
        component: AfiliadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.afiliado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'afiliado/:id/edit',
        component: AfiliadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.afiliado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'afiliado/:id/delete',
        component: AfiliadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.afiliado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
