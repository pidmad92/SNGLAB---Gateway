import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DetmotdenComponent } from './detmotden.component';
import { DetmotdenDetailComponent } from './detmotden-detail.component';
import { DetmotdenPopupComponent } from './detmotden-dialog.component';
import { DetmotdenDeletePopupComponent } from './detmotden-delete-dialog.component';

export const detmotdenRoute: Routes = [
    {
        path: 'detmotden',
        component: DetmotdenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.detmotden.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'detmotden/:id',
        component: DetmotdenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.detmotden.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detmotdenPopupRoute: Routes = [
    {
        path: 'detmotden-new',
        component: DetmotdenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.detmotden.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detmotden/:id/edit',
        component: DetmotdenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.detmotden.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detmotden/:id/delete',
        component: DetmotdenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.detmotden.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
