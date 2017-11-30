import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionpjComponent } from './atencionpj.component';
import { AtencionpjDetailComponent } from './atencionpj-detail.component';
import { AtencionpjPopupComponent } from './atencionpj-dialog.component';
import { AtencionpjDeletePopupComponent } from './atencionpj-delete-dialog.component';

export const atencionpjRoute: Routes = [
    {
        path: 'atencionpj',
        component: AtencionpjComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencionpj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atencionpj/:id',
        component: AtencionpjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencionpj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atencionpjPopupRoute: Routes = [
    {
        path: 'atencionpj-new',
        component: AtencionpjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencionpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atencionpj/:id/edit',
        component: AtencionpjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencionpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atencionpj/:id/delete',
        component: AtencionpjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.atencionpj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
