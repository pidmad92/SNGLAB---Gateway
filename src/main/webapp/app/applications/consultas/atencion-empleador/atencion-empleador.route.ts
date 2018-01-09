import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionEmpleadorComponent } from './atencion-empleador.component';
import { AtencionEmpleadorWizardComponent } from './atencion-empleador-wizard.component';
import { DatosRepresentanteComponent } from './atencion-empleador-wizard/datos-representante.component';
import { DatosEmpleadorComponent } from './atencion-empleador-wizard/datos-empleador.component'
import { DatosTrabajadorComponent } from './atencion-empleador-wizard/datos-trabajador.component';
import { AccionesRealizarComponent } from './atencion-empleador-wizard/acciones-realizar.component';
import { DocumentosPresentadosComponent } from './atencion-empleador-wizard/documentos-presentados.component';
import { MotivosConsultaComponent } from './atencion-empleador-wizard/motivos-consulta.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const atencionEmpleadorRoute: Routes = [
    {
        path: 'atencion-empleador',
        component: AtencionEmpleadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            // pageTitle: 'gatewayApp.accionadop.home.title'
            pageTitle: 'global.menu.entities.atencionEmp'
        },
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: 'accionadop/:id',
    //     component: AccionadopDetailComponent,
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'gatewayApp.accionadop.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

export const accionadopPopupRoute: Routes = [
    {
        path: 'registro-atencion-empleador',
        component: AtencionEmpleadorWizardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.atencionEmp'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'datos-trabajador-representante',
                component: DatosRepresentanteComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionEmp'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-empleador',
                component: DatosEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionEmp'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-trabajador-invitado',
                component: DatosTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionEmp'
                },
                outlet: 'wizard'
            },
            {
                path: 'motivos-consulta',
                component: MotivosConsultaComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionEmp'
                },
                outlet: 'wizard'
            },
            // {
            //     path: 'vinculo-laboral',
            //     component: VinculoLaboralComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionEmp'
            //     },
            //     outlet: 'wizard'
            // },
            {
                path: 'documentos-presentados',
                component: DocumentosPresentadosComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionEmp'
                },
                outlet: 'wizard'
            },
            // {
            //     path: 'acciones-realizar',
            //     component: AccionesRealizarComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionEmp'
            //     },
            //     outlet: 'wizard'
            // },
        ]
    }

];
