import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InfosoliComponent } from './infosoli.component';
import { InfosoliDetailComponent } from './infosoli-detail.component';
import { InfosoliPopupComponent } from './infosoli-dialog.component';
import { InfosoliDeletePopupComponent } from './infosoli-delete-dialog.component';

export const infosoliRoute: Routes = [
    {
        path: 'infosoli',
        component: InfosoliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.infosoli.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'infosoli/:id',
        component: InfosoliDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.infosoli.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const infosoliPopupRoute: Routes = [
    {
        path: 'infosoli-new',
        component: InfosoliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.infosoli.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'infosoli/:id/edit',
        component: InfosoliPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.infosoli.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'infosoli/:id/delete',
        component: InfosoliDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.infosoli.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
