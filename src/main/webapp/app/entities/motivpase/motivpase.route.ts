import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotivpaseComponent } from './motivpase.component';
import { MotivpaseDetailComponent } from './motivpase-detail.component';
import { MotivpasePopupComponent } from './motivpase-dialog.component';
import { MotivpaseDeletePopupComponent } from './motivpase-delete-dialog.component';

export const motivpaseRoute: Routes = [
    {
        path: 'motivpase',
        component: MotivpaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivpase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motivpase/:id',
        component: MotivpaseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivpase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motivpasePopupRoute: Routes = [
    {
        path: 'motivpase-new',
        component: MotivpasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivpase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivpase/:id/edit',
        component: MotivpasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivpase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivpase/:id/delete',
        component: MotivpaseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivpase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
