import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotivoceseComponent } from './motivocese.component';
import { MotivoceseDetailComponent } from './motivocese-detail.component';
import { MotivocesePopupComponent } from './motivocese-dialog.component';
import { MotivoceseDeletePopupComponent } from './motivocese-delete-dialog.component';

export const motivoceseRoute: Routes = [
    {
        path: 'motivocese',
        component: MotivoceseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivocese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motivocese/:id',
        component: MotivoceseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivocese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motivocesePopupRoute: Routes = [
    {
        path: 'motivocese-new',
        component: MotivocesePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivocese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivocese/:id/edit',
        component: MotivocesePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivocese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motivocese/:id/delete',
        component: MotivoceseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motivocese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
