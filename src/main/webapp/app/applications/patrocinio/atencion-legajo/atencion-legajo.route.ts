import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { AtencionLegajoComponent } from './atencion-legajo.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const AtencionLegajoRoute: Routes = [
    {
        path: 'atencion/legajo',
        component: AtencionLegajoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.patrocionioRegistroAtencion'
        },
        canActivate: [UserRouteAccessService],
        children: [
        ]
    }
];
