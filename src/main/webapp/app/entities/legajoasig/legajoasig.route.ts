import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LegajoasigComponent } from './legajoasig.component';
import { LegajoasigDetailComponent } from './legajoasig-detail.component';
import { LegajoasigPopupComponent } from './legajoasig-dialog.component';
import { LegajoasigDeletePopupComponent } from './legajoasig-delete-dialog.component';

export const legajoasigRoute: Routes = [
    {
        path: 'legajoasig',
        component: LegajoasigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajoasig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'legajoasig/:id',
        component: LegajoasigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajoasig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legajoasigPopupRoute: Routes = [
    {
        path: 'legajoasig-new',
        component: LegajoasigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajoasig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legajoasig/:id/edit',
        component: LegajoasigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajoasig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legajoasig/:id/delete',
        component: LegajoasigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legajoasig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
