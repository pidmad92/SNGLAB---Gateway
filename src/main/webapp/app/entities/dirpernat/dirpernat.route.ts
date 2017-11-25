import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DirpernatComponent } from './dirpernat.component';
import { DirpernatDetailComponent } from './dirpernat-detail.component';
import { DirpernatPopupComponent } from './dirpernat-dialog.component';
import { DirpernatDeletePopupComponent } from './dirpernat-delete-dialog.component';

export const dirpernatRoute: Routes = [
    {
        path: 'dirpernat',
        component: DirpernatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirpernat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dirpernat/:id',
        component: DirpernatDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirpernat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dirpernatPopupRoute: Routes = [
    {
        path: 'dirpernat-new',
        component: DirpernatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirpernat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirpernat/:id/edit',
        component: DirpernatPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirpernat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dirpernat/:id/delete',
        component: DirpernatDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dirpernat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
