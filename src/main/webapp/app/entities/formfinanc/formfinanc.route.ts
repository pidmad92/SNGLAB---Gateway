import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FormfinancComponent } from './formfinanc.component';
import { FormfinancDetailComponent } from './formfinanc-detail.component';
import { FormfinancPopupComponent } from './formfinanc-dialog.component';
import { FormfinancDeletePopupComponent } from './formfinanc-delete-dialog.component';

export const formfinancRoute: Routes = [
    {
        path: 'formfinanc',
        component: FormfinancComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formfinanc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formfinanc/:id',
        component: FormfinancDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formfinanc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formfinancPopupRoute: Routes = [
    {
        path: 'formfinanc-new',
        component: FormfinancPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formfinanc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formfinanc/:id/edit',
        component: FormfinancPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formfinanc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formfinanc/:id/delete',
        component: FormfinancDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formfinanc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
