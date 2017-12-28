import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TrabajadorComponent } from './trabajador/trabajador.component';
import { EmpleadorComponent } from './empleador/empleador.component';
import { DatosLaboralesComponent } from './datos-laborales/datos-laborales.component';

export const RegistroAtencionRoute: Routes = [
    {
        path: 'registro-atencion',
        data: {
            authorities: ['ROLE_USER'],
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'trabajador',
                component: TrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'empleador',
                component: EmpleadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'datos-laborales',
                component: DatosLaboralesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
