import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConsultaExpedienteComponent, ConsultaExpedienteEmpleadorComponent, ConsultaExpedientePopupComponent } from './';

export const consultaExpedienteRoute: Routes = [
    {
        path: 'consulta-expediente',
        component: ConsultaExpedienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'expediente/:id',
                component: ConsultaExpedientePopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'consulta-expediente-empleador',
                component: ConsultaExpedienteEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'wizard'
            }

        ]
    }

];
