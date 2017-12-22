import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionEmpleadorComponent } from './atencion-empleador.component';
import { AtencionEmpleadorWizardComponent } from './atencion-empleador-wizard.component';
import { DatosEmpleadorComponent } from './atencion-empleador-wizard/datos-empleador.component'
// import { DatosTrabajadorComponent } from './atencion-trabajador-wizard/datos-trabajador.component';
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
            pageTitle: 'global.menu.entities.atencionTra'
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
            pageTitle: 'global.menu.entities.atencionTra'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'datos-empleador',
                component: DatosEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                outlet: 'wizard'
            },
            // {
            //     path: 'datos-trabajador',
            //     component: DatosTrabajadorComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
            // {
            //     path: 'datos-trabajador/:id',
            //     component: DatosTrabajadorComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
            // {
            //     path: 'motivos-consulta',
            //     component: MotivosConsultaComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
            // {
            //     path: 'vinculo-laboral',
            //     component: VinculoLaboralComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
            // {
            //     path: 'documentos-presentados',
            //     component: DocumentosPresentadosComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
            // {
            //     path: 'acciones-realizar',
            //     component: AccionesRealizarComponent,
            //     data: {
            //         authorities: ['ROLE_USER'],
            //         pageTitle: 'global.menu.entities.atencionTra'
            //     },
            //     outlet: 'wizard'
            // },
        ]
    }

];
