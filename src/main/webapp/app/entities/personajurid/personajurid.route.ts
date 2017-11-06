import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonajuridComponent } from './personajurid.component';
import { PersonajuridDetailComponent } from './personajurid-detail.component';
import { PersonajuridPopupComponent } from './personajurid-dialog.component';
import { PersonajuridDeletePopupComponent } from './personajurid-delete-dialog.component';

export const personajuridRoute: Routes = [
    {
        path: 'personajurid',
        component: PersonajuridComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personajurid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'personajurid/:id',
        component: PersonajuridDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personajurid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personajuridPopupRoute: Routes = [
    {
        path: 'personajurid-new',
        component: PersonajuridPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personajurid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personajurid/:id/edit',
        component: PersonajuridPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personajurid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personajurid/:id/delete',
        component: PersonajuridDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personajurid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
