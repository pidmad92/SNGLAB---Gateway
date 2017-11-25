import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResulnegocComponent } from './resulnegoc.component';
import { ResulnegocDetailComponent } from './resulnegoc-detail.component';
import { ResulnegocPopupComponent } from './resulnegoc-dialog.component';
import { ResulnegocDeletePopupComponent } from './resulnegoc-delete-dialog.component';

export const resulnegocRoute: Routes = [
    {
        path: 'resulnegoc',
        component: ResulnegocComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulnegoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resulnegoc/:id',
        component: ResulnegocDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulnegoc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resulnegocPopupRoute: Routes = [
    {
        path: 'resulnegoc-new',
        component: ResulnegocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulnegoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resulnegoc/:id/edit',
        component: ResulnegocPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulnegoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resulnegoc/:id/delete',
        component: ResulnegocDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.resulnegoc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
