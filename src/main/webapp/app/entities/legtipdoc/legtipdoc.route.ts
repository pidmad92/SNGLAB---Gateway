import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LegtipdocComponent } from './legtipdoc.component';
import { LegtipdocDetailComponent } from './legtipdoc-detail.component';
import { LegtipdocPopupComponent } from './legtipdoc-dialog.component';
import { LegtipdocDeletePopupComponent } from './legtipdoc-delete-dialog.component';

export const legtipdocRoute: Routes = [
    {
        path: 'legtipdoc',
        component: LegtipdocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legtipdoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'legtipdoc/:id',
        component: LegtipdocDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legtipdoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legtipdocPopupRoute: Routes = [
    {
        path: 'legtipdoc-new',
        component: LegtipdocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legtipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legtipdoc/:id/edit',
        component: LegtipdocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legtipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'legtipdoc/:id/delete',
        component: LegtipdocDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.legtipdoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
