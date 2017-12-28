import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioLaboralComponent } from './formulario-laboral.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ControlInformacionComponent } from '../control-informacion/index';

export const FormularioLaboralRoute: Routes = [
    {
        path: 'dictamenes/formulario-laboral',
        component: FormularioLaboralComponent,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
    }
];
