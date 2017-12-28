import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioFinancieroN1Component } from './formulario-financiero-n1.component';
import { FormularioFinancieroAnexo1AComponent } from './formulario-financiero-anexo1a.component';
import { FormularioFinancieroAnexo1BComponent } from './formulario-financiero-anexo1b.component';
import { FormularioFinancieroAnexo1CComponent } from './formulario-financiero-anexo1c.component';
import { FormularioFinancieroAnexo1DComponent } from './formulario-financiero-anexo1d.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ControlInformacionComponent } from '../control-informacion/index';

export const FormularioFinancieroRoute: Routes = [
    {
        path: 'dictamenes/formulario-financiero-n1/:nCodffina',
        component: FormularioFinancieroN1Component,
    }, {
        path: 'dictamenes/formulario-financiero-anexo1a/:nCodffina',
        component: FormularioFinancieroAnexo1AComponent,
    }, {
        path: 'dictamenes/formulario-financiero-anexo1b/:nCodffina',
        component: FormularioFinancieroAnexo1BComponent,
    }, {
        path: 'dictamenes/formulario-financiero-anexo1c/:nCodffina',
        component: FormularioFinancieroAnexo1CComponent,
    }, {
        path: 'dictamenes/formulario-financiero-anexo1d/:nCodffina',
        component: FormularioFinancieroAnexo1DComponent,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
    }
];
