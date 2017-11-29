import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConsultaExpedienteComponent, ConsultaExpedienteArchivarPopupComponent, ConsultaExpedienteObservarPopupComponent, ConsultaExpedientePopupComponent } from './';

export const consultaExpedienteRoute: Routes = [
    {
        path: 'expediente/consulta',
        component: ConsultaExpedienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: ConsultaExpedientePopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'observar/:id',
                component: ConsultaExpedienteObservarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'archivar/:id',
                component: ConsultaExpedienteArchivarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }

        ]
    }

];
