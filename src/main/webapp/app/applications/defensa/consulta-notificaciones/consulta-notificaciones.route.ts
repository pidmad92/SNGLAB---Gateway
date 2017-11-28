import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConsultaNotificacionesComponent, ConsultaNotificacionesPopupComponent } from './';

export const consultaNotificacionesRoute: Routes = [
    {
        path: 'consulta-notificaciones',
        component: ConsultaNotificacionesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'notificaciones/:id',
                component: ConsultaNotificacionesPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    }

];
