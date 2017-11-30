import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BandejaComponent } from './bandeja.component';
import { EvaluarPopupComponent } from './evaluar.component';

export const BandejaRoute: Routes = [
    {
        path: 'bandeja',
        component: BandejaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BandejaRecursos'
        },

        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'evaluar-bandeja/:id',
                component: EvaluarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'EvaluarBandeja'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
    }
];

export const BandejaPopupRoute: Routes = [
    {
        path: 'evaluar-bandeja',
        component: EvaluarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluarBandeja'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popupexp'
    }
];
