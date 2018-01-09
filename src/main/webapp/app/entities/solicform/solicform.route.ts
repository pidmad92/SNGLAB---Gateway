import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SolicformComponent } from './solicform.component';

export const solicformRoute: Routes = [
    {
        path: 'solicform',
        component: SolicformComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicform.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
