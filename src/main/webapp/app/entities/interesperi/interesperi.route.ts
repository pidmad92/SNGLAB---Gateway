import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InteresperiComponent } from './interesperi.component';
import { InteresperiDetailComponent } from './interesperi-detail.component';
import { InteresperiPopupComponent } from './interesperi-dialog.component';
import { InteresperiDeletePopupComponent } from './interesperi-delete-dialog.component';

export const interesperiRoute: Routes = [
    {
        path: 'interesperi',
        component: InteresperiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.interesperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'interesperi/:id',
        component: InteresperiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.interesperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interesperiPopupRoute: Routes = [
    {
        path: 'interesperi-new',
        component: InteresperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.interesperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interesperi/:id/edit',
        component: InteresperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.interesperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'interesperi/:id/delete',
        component: InteresperiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.interesperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
