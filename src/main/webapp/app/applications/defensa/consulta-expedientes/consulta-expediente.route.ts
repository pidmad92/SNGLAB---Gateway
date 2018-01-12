import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccionExpedienteComponent } from './accion-expedientes/accion-expediente.component';
import { AccionExpedienteArchivarPopupComponent } from './accion-expedientes/accion-expediente-archivar-dialog.component'
import { AccionExpedienteObservarPopupComponent } from './accion-expedientes/accion-expediente-observar-dialog.component'
import { AccionExpedientePopupComponent } from './accion-expedientes/accion-expediente-dialog.component';

import { ExpedienteEmitidoComponent } from './expedientes/expediente-emitido.component';
import { ExpedienteMultadoComponent } from './expedientes/expediente-multado.component';
import { ExpedienteParaMultarComponent } from './expedientes/expediente-paramultar.component';
import { DocumentoAsignacionPopupComponent } from './expedientes/documento-asignacion-dialog.component';
import { AudienciaConsultaPopupComponent } from './../audiencias';
import { MultaConsultaPopupComponent } from './expedientes/multa-consulta-dialog.component';
import { ResolucionSubdirectoralPopupComponent } from './expedientes/resolucion-subdirectoral-dialog.component';

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
                path: 'exp-emitidos',
                component: ExpedienteEmitidoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                // outlet: 'emitidos',
                children: [
                    {
                        path: 'documento/:id',
                        component: DocumentoAsignacionPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupdoc'
                    },
                    {
                        path: ':id',
                        component: AudienciaConsultaPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupexpe'
                    }
                ]
            },
            {
                path: 'exp-multados',
                component: ExpedienteMultadoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                // outlet: 'multados',
                children: [
                    {
                        path: 'documento/:id',
                        component: DocumentoAsignacionPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupdoc'
                    },
                    {
                        path: ':id',
                        component: AudienciaConsultaPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupexpm'
                    }
                ]
            },
            {
                path: 'exp-paramultar',
                component: ExpedienteParaMultarComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                // outlet: 'multados',
                children: [
                    {
                        path: ':id',
                        component: AudienciaConsultaPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupexpp'
                    },
                    {
                        path: 'multa/:id',
                        component: MultaConsultaPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupmulp'
                    },
                    {
                        path: 'resolucion/:id',
                        component: ResolucionSubdirectoralPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'global.menu.entities.consultaExpediente'
                        },
                        outlet: 'popupresp'
                    }
                ]
            },
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
