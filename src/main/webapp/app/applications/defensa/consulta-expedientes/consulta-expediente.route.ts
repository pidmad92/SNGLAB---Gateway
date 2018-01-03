import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccionExpedienteComponent } from './accion-expedientes/accion-expediente.component';
import { AccionExpedienteArchivarPopupComponent } from './accion-expedientes/accion-expediente-archivar-dialog.component'
import { AccionExpedienteObservarPopupComponent } from './accion-expedientes/accion-expediente-observar-dialog.component'
import { AccionExpedientePopupComponent } from './accion-expedientes/accion-expediente-dialog.component';

import { ConsultaExpedienteComponent } from './';
import { ConsultaExpedienteArchivarPopupComponent } from './'
import { ConsultaExpedienteObservarPopupComponent } from './'
import { ConsultaExpedientePopupComponent } from './';

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
    },
    {
        path: 'expediente/accion',
        component: AccionExpedienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.accionExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AccionExpedientePopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.accionExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'observar/:id',
                component: AccionExpedienteObservarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.accionExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'archivar/:id',
                component: AccionExpedienteArchivarPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.accionExpediente'
                },
                outlet: 'popupexp'
            }

        ]
    }

];
