import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MantenimientoResultadoComponent, MantenimientoAudienciaComponent, MantenimientoResultadoPopupComponent } from './';

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
                path: ':id',
                component: MantenimientoResultadoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
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
                outlet: 'popup'
            }
            // ,
            // {
            //     path: 'resulconci/:id/delete',
            //     component: ResulconciDeletePopupComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'gatewayApp.resulconci.home.title'
            //     },
            //     canActivate: [UserRouteAccessService],
            //     outlet: 'popup'
            // }
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
