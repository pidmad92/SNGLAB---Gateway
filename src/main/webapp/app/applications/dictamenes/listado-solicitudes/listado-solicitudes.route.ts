import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ListadoSolicitudesComponent } from './listado-solicitudes.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { SolicitudPopupComponent } from '../../../entities/solicitud/solicitud-dialog.component';
import { ControlInformacionComponent } from '../control-informacion/index';

export const ListadoSolicitudesRoute: Routes = [
    {
        path: 'dictamenes/listado-solicitudes',
        component: ListadoSolicitudesComponent,
        children: []
    }, {
        path: 'dictamenes/control-informacion',
        component: ControlInformacionComponent,
        children: [],
        }

    , {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
        children: [],
        }
];
