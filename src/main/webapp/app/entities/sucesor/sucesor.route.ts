import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SucesorComponent } from './sucesor.component';
import { SucesorDetailComponent } from './sucesor-detail.component';
import { SucesorPopupComponent } from './sucesor-dialog.component';
import { SucesorDeletePopupComponent } from './sucesor-delete-dialog.component';

export const sucesorRoute: Routes = [
    {
        path: 'sucesor',
        component: SucesorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sucesor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sucesor/:id',
        component: SucesorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sucesor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sucesorPopupRoute: Routes = [
    {
        path: 'sucesor-new',
        component: SucesorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sucesor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sucesor/:id/edit',
        component: SucesorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sucesor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sucesor/:id/delete',
        component: SucesorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.sucesor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
