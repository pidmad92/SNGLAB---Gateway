import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtenaccadopComponent } from './atenaccadop.component';
import { AtenaccadopDetailComponent } from './atenaccadop-detail.component';
import { AtenaccadopPopupComponent } from './atenaccadop-dialog.component';
import { AtenaccadopDeletePopupComponent } from './atenaccadop-delete-dialog.component';

export const atenaccadopRoute: Routes = [
    {
        path: 'atenaccadop',
        component: AtenaccadopComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenaccadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atenaccadop/:id',
        component: AtenaccadopDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenaccadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atenaccadopPopupRoute: Routes = [
    {
        path: 'atenaccadop-new',
        component: AtenaccadopPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenaccadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atenaccadop/:id/edit',
        component: AtenaccadopPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenaccadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atenaccadop/:id/delete',
        component: AtenaccadopDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atenaccadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
