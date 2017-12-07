import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { RegistroLegajoComponent } from './legajo-registro.component';
import { DatosTrabajadorComponent } from './legajo-registro-wizard/datos-trabajador.component';
import { DatosEmpleadorComponent } from './legajo-registro-wizard/datos-empleador.component';
import { SeleccionLegajoComponent } from './legajo-registro-wizard/seleccion-legajo.component';
import { DatosAbogadoComponent } from './legajo-registro-wizard/datos-abogado.component';
import { DatosResumenComponent } from './legajo-registro-wizard/datos-resumen.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const registroLegajoRoute: Routes = [
    {
        path: 'legajo/registro',
        component: RegistroLegajoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroLegajo'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'seleccion-legajo',
                component: SeleccionLegajoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-trabajador',
                component: DatosTrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-empleador',
                component: DatosEmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-abogado',
                component: DatosAbogadoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            },
            {
                path: 'datos-resumen',
                component: DatosResumenComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            }
        ]
    }
];
