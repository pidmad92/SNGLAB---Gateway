import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CtsComponent } from './cts/cts.component';
import { GratificacionesComponent } from './gratificaciones/gratificaciones.component';
import { IndemnizacionesComponent } from './indemnizaciones/indemnizaciones.component';
import { RemuneracionesInsolutasComponent } from './remuneraciones-insolutas/remuneraciones-insolutas.component';
import { ResumenComponent } from './resumen/resumen.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';

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
            },
            {
                path: 'gratificaciones',
                component: GratificacionesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'vacaciones',
                component: VacacionesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'indemnizaciones',
                component: IndemnizacionesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'remuneraciones-insolutas',
                component: RemuneracionesInsolutasComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'resumen',
                component: ResumenComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
