import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalrcmperiComponent } from './calrcmperi.component';
import { CalrcmperiDetailComponent } from './calrcmperi-detail.component';
import { CalrcmperiPopupComponent } from './calrcmperi-dialog.component';
import { CalrcmperiDeletePopupComponent } from './calrcmperi-delete-dialog.component';

export const calrcmperiRoute: Routes = [
    {
        path: 'calrcmperi',
        component: CalrcmperiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calrcmperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calrcmperi/:id',
        component: CalrcmperiDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calrcmperi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calrcmperiPopupRoute: Routes = [
    {
        path: 'calrcmperi-new',
        component: CalrcmperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calrcmperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calrcmperi/:id/edit',
        component: CalrcmperiPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calrcmperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calrcmperi/:id/delete',
        component: CalrcmperiDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calrcmperi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
