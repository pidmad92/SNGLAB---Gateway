import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocingrepercComponent } from './docingreperc.component';
import { DocingrepercDetailComponent } from './docingreperc-detail.component';
import { DocingrepercPopupComponent } from './docingreperc-dialog.component';
import { DocingrepercDeletePopupComponent } from './docingreperc-delete-dialog.component';

export const docingrepercRoute: Routes = [
    {
        path: 'docingreperc',
        component: DocingrepercComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingreperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docingreperc/:id',
        component: DocingrepercDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingreperc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docingrepercPopupRoute: Routes = [
    {
        path: 'docingreperc-new',
        component: DocingrepercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingreperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docingreperc/:id/edit',
        component: DocingrepercPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingreperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docingreperc/:id/delete',
        component: DocingrepercDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docingreperc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
