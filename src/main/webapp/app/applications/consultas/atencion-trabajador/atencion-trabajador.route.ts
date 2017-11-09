import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionTrabajadorComponent } from './atencion-trabajador.component';
import { AtencionTrabajadorWizardComponent } from './atencion-trabajador-wizard.component';
import { DatosTrabajadorComponent } from './atencion-trabajador-wizard/datos-trabajador.component';
import { MotivosConsultaComponent } from './atencion-trabajador-wizard/motivos-consulta.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const atencionTrabajadorRoute: Routes = [
    {
        path: 'atencion-trabajador',
        component: AtencionTrabajadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

 export const accionadopPopupRoute: Routes = [
    {
        path: 'wizard',
        component: AtencionTrabajadorWizardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'datos-trabajador',
                component: DatosTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },
                outlet: 'wizard'
            },
            {
                path: 'motivos-consulta',
                component: MotivosConsultaComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },
                outlet: 'wizard'
            }
        ]
    }

];
