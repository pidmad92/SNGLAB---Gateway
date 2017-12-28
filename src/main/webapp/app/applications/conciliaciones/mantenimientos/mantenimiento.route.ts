import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MantenimientoResultadoComponent, MantenimientoAudienciaComponent, MantenimientoResultadoPopupComponent, MantenimientoResultadoDeletePopupComponent } from './';

export const mantenimientoRoute: Routes = [
    {
        path: 'mantenimiento/resultados',
        component: MantenimientoResultadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'registrar',
                component: MantenimientoResultadoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.resulconci.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            },
            {
                path: ':id/editar',
                component: MantenimientoResultadoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.resulconci.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            },
            {
                path: ':id/eliminar',
                component: MantenimientoResultadoDeletePopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.resulconci.home.title'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'mantenimiento/audiencias',
        component: MantenimientoAudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
    }

];
