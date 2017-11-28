import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DirperjuriComponent } from './dirperjuri.component';
import { DirperjuriDetailComponent } from './dirperjuri-detail.component';
import { DirperjuriPopupComponent } from './dirperjuri-dialog.component';
import { DirperjuriDeletePopupComponent } from './dirperjuri-delete-dialog.component';

export const dirperjuriRoute: Routes = [
    {
        path: 'dirperjuri',
        component: DirperjuriComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirperjuri.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dirperjuri/:id',
        component: DirperjuriDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirperjuri.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dirperjuriPopupRoute: Routes = [
    {
        path: 'dirperjuri-new',
        component: DirperjuriPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirperjuri.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirperjuri/:id/edit',
        component: DirperjuriPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirperjuri.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirperjuri/:id/delete',
        component: DirperjuriDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirperjuri.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
