import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConsultaExpedienteComponent, ConsultaExpedienteEmpleadorComponent, ConsultaExpedienteTrabajadorComponent } from './';

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
                path: 'consulta-expediente-trabajador',
                component: ConsultaExpedienteTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'wizard'
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
