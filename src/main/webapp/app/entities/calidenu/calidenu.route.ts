import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalidenuComponent } from './calidenu.component';
import { CalidenuDetailComponent } from './calidenu-detail.component';
import { CalidenuPopupComponent } from './calidenu-dialog.component';
import { CalidenuDeletePopupComponent } from './calidenu-delete-dialog.component';

export const calidenuRoute: Routes = [
    {
        path: 'calidenu',
        component: CalidenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calidenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calidenu/:id',
        component: CalidenuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calidenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calidenuPopupRoute: Routes = [
    {
        path: 'calidenu-new',
        component: CalidenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calidenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calidenu/:id/edit',
        component: CalidenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calidenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calidenu/:id/delete',
        component: CalidenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calidenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
