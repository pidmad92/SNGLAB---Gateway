import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipaudiComponent } from './tipaudi.component';
import { TipaudiDetailComponent } from './tipaudi-detail.component';
import { TipaudiPopupComponent } from './tipaudi-dialog.component';
import { TipaudiDeletePopupComponent } from './tipaudi-delete-dialog.component';

export const tipaudiRoute: Routes = [
    {
        path: 'tipaudi',
        component: TipaudiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipaudi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipaudi/:id',
        component: TipaudiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipaudi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipaudiPopupRoute: Routes = [
    {
        path: 'tipaudi-new',
        component: TipaudiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipaudi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipaudi/:id/edit',
        component: TipaudiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipaudi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipaudi/:id/delete',
        component: TipaudiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipaudi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
