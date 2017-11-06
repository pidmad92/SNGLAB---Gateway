import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotivoatenciComponent } from './motivoatenci.component';
import { MotivoatenciDetailComponent } from './motivoatenci-detail.component';
import { MotivoatenciPopupComponent } from './motivoatenci-dialog.component';
import { MotivoatenciDeletePopupComponent } from './motivoatenci-delete-dialog.component';

export const motivoatenciRoute: Routes = [
    {
        path: 'motivoatenci',
        component: MotivoatenciComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivoatenci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motivoatenci/:id',
        component: MotivoatenciDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivoatenci.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motivoatenciPopupRoute: Routes = [
    {
        path: 'motivoatenci-new',
        component: MotivoatenciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivoatenci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivoatenci/:id/edit',
        component: MotivoatenciPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivoatenci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivoatenci/:id/delete',
        component: MotivoatenciDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivoatenci.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
