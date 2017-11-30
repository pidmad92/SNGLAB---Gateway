import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroExpedienteComponent } from './registro-expediente.component';
import { DatosPaseComponent } from './registro-expediente-wizard/datos-pase.component';
import { DatosTrabajadorComponent } from './registro-expediente-wizard/datos-trabajador.component';
import { DatosEmpleadorComponent } from './registro-expediente-wizard/datos-empleador.component';
import { DatosExpedienteComponent } from './registro-expediente-wizard/datos-expediente.component';
import { DatosAudienciaComponent } from './registro-expediente-wizard/datos-audiencia.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const registroExpedienteRoute: Routes = [
    {
        path: 'expediente/registro',
        component: RegistroExpedienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'datos-pase',
                component: DatosPaseComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-trabajador',
                component: DatosTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-empleador',
                component: DatosEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-expediente',
                component: DatosExpedienteComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-audiencia',
                component: DatosAudienciaComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
        ]
    }

];
