import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ControlInformacionComponent } from './control-informacion.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ListadoSolicitudesComponent } from '../listado-solicitudes/index';

export const ControlInformacionRoute: Routes = [
    {
        path: 'dictamenes/control-informacion',
        component: ControlInformacionComponent,
    }, {
        path: 'dictamenes/listado-solicitudes',
        component: ListadoSolicitudesComponent,
    }
];
