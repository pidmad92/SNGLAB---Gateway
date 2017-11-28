import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AudienciaComponent,
    AudienciaAsignacionPopupComponent,
    AudienciaRegistroResultadoPopupComponent,
    AudienciaRegistroEscritoPopupComponent,
    AudienciaReprogramacionPopupComponent,
    AudienciaPopupComponent } from './';

export const audienciaRoute: Routes = [
    {
        path: 'audiencia',
        component: AudienciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.consultaExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'audiencia/:id',
                component: AudienciaPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'asignacion/:id',
                component: AudienciaAsignacionPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            },
            {
                path: 'registro-resultado/:id',
                component: AudienciaRegistroResultadoPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.consultaExpediente'
                },
                outlet: 'popupexp'
            }

        ]
    }

];
