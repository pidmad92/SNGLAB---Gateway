import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ActieconComponent } from './actiecon.component';
import { ActieconDetailComponent } from './actiecon-detail.component';
import { ActieconPopupComponent } from './actiecon-dialog.component';
import { ActieconDeletePopupComponent } from './actiecon-delete-dialog.component';

export const actieconRoute: Routes = [
    {
        path: 'actiecon',
        component: ActieconComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.actiecon.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'actiecon/:id',
        component: ActieconDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.actiecon.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actieconPopupRoute: Routes = [
    {
        path: 'actiecon-new',
        component: ActieconPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.actiecon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actiecon/:id/edit',
        component: ActieconPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.actiecon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actiecon/:id/delete',
        component: ActieconDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.actiecon.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
