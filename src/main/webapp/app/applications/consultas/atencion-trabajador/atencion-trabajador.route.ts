import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionTrabajadorComponent } from './atencion-trabajador.component';
import { AtencionTrabajadorWizardComponent } from './atencion-trabajador-wizard.component';
import { DatosTrabajadorComponent } from './atencion-trabajador-wizard/datos-trabajador.component';
import { MotivosConsultaComponent } from './atencion-trabajador-wizard/motivos-consulta.component';
import { DatosEmpleadorComponent } from './atencion-trabajador-wizard/datos-empleador.component';
import { VinculoLaboralComponent } from './atencion-trabajador-wizard/vinculo-laboral.component';
import { DocumentosPresentadosComponent } from './atencion-trabajador-wizard/documentos-presentados.component';
import { AccionesRealizarComponent } from './atencion-trabajador-wizard/acciones-realizar.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const atencionTrabajadorRoute: Routes = [
    {
        path: 'atencion-trabajador',
        component: AtencionTrabajadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.atencionTra'
        },
        canActivate: [UserRouteAccessService]
    }
];

 export const accionadopPopupRoute: Routes = [
    {
        path: 'registro-atencion-trabajador',
        component: AtencionTrabajadorWizardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.atencionTra'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'datos-trabajador',
                component: DatosTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            {
                path: 'motivos-consulta',
                component: MotivosConsultaComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-empleador',
                component: DatosEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            {
                path: 'vinculo-laboral',
                component: VinculoLaboralComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            {
                path: 'documentos-presentados',
                component: DocumentosPresentadosComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            {
                path: 'acciones-realizar',
                component: AccionesRealizarComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
        ]
    }

];
