import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AfiliarDesafiliarComponent } from './afiliar-desafiliar.component';
import { EvaluarAfiliarPopupComponent } from './evaluar-afiliar.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const AfiliarDesafiliarRoute: Routes = [
    {
        path: 'afiliar-desafiliar',
        component: AfiliarDesafiliarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AfiliarDesafiliar'
        },

        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'evaluar-afiliar/:id',
                component: EvaluarAfiliarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'EvaluarAfiliarDesafiliar'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
    }
];

export const AfiliarDesafiliarPopupRoute: Routes = [
    {
        path: 'evaluar-afiliar/:id',
        component: EvaluarAfiliarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluar Solicitudes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popupexp'
    }
];
