import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EnvioNotificacionComponent } from './envio-notificacion.component';
import { SeleccionExpedienteComponent } from './envio-notificacion-wizard/seleccion-expediente.component';
import { VerificacionExpedienteComponent } from './envio-notificacion-wizard/verificacion-expediente.component';
import { ResumenNotificacionComponent } from './envio-notificacion-wizard/resumen-notificacion.component';

// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const envioNotificacionRoute: Routes = [
    {
        path: 'expediente/envio-notificacion',
        component: EnvioNotificacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'seleccion-expediente',
                component: SeleccionExpedienteComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.envioNotificacion'
                },
                outlet: 'wizard'
            },
            {
                path: 'verificacion-expediente',
                component: VerificacionExpedienteComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.envioNotificacion'
                },
                outlet: 'wizard'
            },
            {
                path: 'resumen-notificacion',
                component: ResumenNotificacionComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.envioNotificacion'
                },
                outlet: 'wizard'
            }
        ]
    }

];
