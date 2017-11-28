import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UndnegocioComponent } from './undnegocio.component';
import { UndnegocioDetailComponent } from './undnegocio-detail.component';
import { UndnegocioPopupComponent } from './undnegocio-dialog.component';
import { UndnegocioDeletePopupComponent } from './undnegocio-delete-dialog.component';

export const undnegocioRoute: Routes = [
    {
        path: 'undnegocio',
        component: UndnegocioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.undnegocio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'undnegocio/:id',
        component: UndnegocioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.undnegocio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const undnegocioPopupRoute: Routes = [
    {
        path: 'undnegocio-new',
        component: UndnegocioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.undnegocio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'undnegocio/:id/edit',
        component: UndnegocioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.undnegocio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'undnegocio/:id/delete',
        component: UndnegocioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.undnegocio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
