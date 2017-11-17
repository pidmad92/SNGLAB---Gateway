import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DlabingrpercComponent } from './dlabingrperc.component';
import { DlabingrpercDetailComponent } from './dlabingrperc-detail.component';
import { DlabingrpercPopupComponent } from './dlabingrperc-dialog.component';
import { DlabingrpercDeletePopupComponent } from './dlabingrperc-delete-dialog.component';

export const dlabingrpercRoute: Routes = [
    {
        path: 'dlabingrperc',
        component: DlabingrpercComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingrperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dlabingrperc/:id',
        component: DlabingrpercDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingrperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dlabingrpercPopupRoute: Routes = [
    {
        path: 'dlabingrperc-new',
        component: DlabingrpercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingrperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dlabingrperc/:id/edit',
        component: DlabingrpercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingrperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dlabingrperc/:id/delete',
        component: DlabingrpercDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dlabingrperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
