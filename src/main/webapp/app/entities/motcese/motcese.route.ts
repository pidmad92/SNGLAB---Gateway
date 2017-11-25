import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotceseComponent } from './motcese.component';
import { MotceseDetailComponent } from './motcese-detail.component';
import { MotcesePopupComponent } from './motcese-dialog.component';
import { MotceseDeletePopupComponent } from './motcese-delete-dialog.component';

export const motceseRoute: Routes = [
    {
        path: 'motcese',
        component: MotceseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motcese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motcese/:id',
        component: MotceseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motcese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motcesePopupRoute: Routes = [
    {
        path: 'motcese-new',
        component: MotcesePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motcese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motcese/:id/edit',
        component: MotcesePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motcese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motcese/:id/delete',
        component: MotceseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motcese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
