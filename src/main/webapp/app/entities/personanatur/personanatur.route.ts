import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonanaturComponent } from './personanatur.component';
import { PersonanaturDetailComponent } from './personanatur-detail.component';
import { PersonanaturPopupComponent } from './personanatur-dialog.component';
import { PersonanaturDeletePopupComponent } from './personanatur-delete-dialog.component';

export const personanaturRoute: Routes = [
    {
        path: 'personanatur',
        component: PersonanaturComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personanatur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'personanatur/:id',
        component: PersonanaturDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personanatur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personanaturPopupRoute: Routes = [
    {
        path: 'personanatur-new',
        component: PersonanaturPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personanatur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personanatur/:id/edit',
        component: PersonanaturPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personanatur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personanatur/:id/delete',
        component: PersonanaturDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.personanatur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
