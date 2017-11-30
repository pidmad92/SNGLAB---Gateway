import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NivelorganiComponent } from './nivelorgani.component';
import { NivelorganiDetailComponent } from './nivelorgani-detail.component';
import { NivelorganiPopupComponent } from './nivelorgani-dialog.component';
import { NivelorganiDeletePopupComponent } from './nivelorgani-delete-dialog.component';

export const nivelorganiRoute: Routes = [
    {
        path: 'nivelorgani',
        component: NivelorganiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.nivelorgani.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nivelorgani/:id',
        component: NivelorganiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.nivelorgani.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nivelorganiPopupRoute: Routes = [
    {
        path: 'nivelorgani-new',
        component: NivelorganiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.nivelorgani.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nivelorgani/:id/edit',
        component: NivelorganiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.nivelorgani.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nivelorgani/:id/delete',
        component: NivelorganiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.nivelorgani.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
