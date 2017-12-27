import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CtsComponent } from './cts/cts.component';

export const CalculoLiquidacionRoute: Routes = [
    {
        path: 'calculo-liquidacion',
        data: {
            authorities: ['ROLE_USER'],
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'cts',
                component: CtsComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
