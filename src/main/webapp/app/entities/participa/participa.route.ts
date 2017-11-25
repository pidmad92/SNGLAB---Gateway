import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ParticipaComponent } from './participa.component';
import { ParticipaDetailComponent } from './participa-detail.component';
import { ParticipaPopupComponent } from './participa-dialog.component';
import { ParticipaDeletePopupComponent } from './participa-delete-dialog.component';

export const participaRoute: Routes = [
    {
        path: 'participa',
        component: ParticipaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.participa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'participa/:id',
        component: ParticipaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.participa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const participaPopupRoute: Routes = [
    {
        path: 'participa-new',
        component: ParticipaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.participa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participa/:id/edit',
        component: ParticipaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.participa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participa/:id/delete',
        component: ParticipaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.participa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
