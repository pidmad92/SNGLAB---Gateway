import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AudienciaComponent,
    AudienciaConsultaComponent,
    AudienciaAsignacionPopupComponent,
    AudienciaRegistroResultadoPopupComponent,
    AudienciaRegistroEscritoPopupComponent,
    AudienciaReprogramacionPopupComponent,
    AudienciaConsultaPopupComponent } from './';

export const audienciaRoute: Routes = [
    {
        path: 'audiencia/asignacion-abogado',
        component: AudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AudienciaAsignacionPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'audiencia/registrar-resultado',
        component: AudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AudienciaRegistroResultadoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'audiencia/reprogramacion',
        component: AudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AudienciaReprogramacionPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'audiencia/registrar-escrito',
        component: AudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AudienciaRegistroEscritoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'audiencia/consulta',
        component: AudienciaConsultaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: ':id',
                component: AudienciaConsultaPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }
        ]
    }

];
