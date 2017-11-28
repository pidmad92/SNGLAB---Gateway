import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FormperfilComponent } from './formperfil.component';
import { FormperfilDetailComponent } from './formperfil-detail.component';
import { FormperfilPopupComponent } from './formperfil-dialog.component';
import { FormperfilDeletePopupComponent } from './formperfil-delete-dialog.component';

export const formperfilRoute: Routes = [
    {
        path: 'formperfil',
        component: FormperfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formperfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formperfil/:id',
        component: FormperfilDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formperfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formperfilPopupRoute: Routes = [
    {
        path: 'formperfil-new',
        component: FormperfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formperfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formperfil/:id/edit',
        component: FormperfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formperfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formperfil/:id/delete',
        component: FormperfilDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.formperfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
