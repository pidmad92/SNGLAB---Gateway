import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioFinancieroPrivadoN1Component } from './formulario-financiero-privado-n1.component';
import { FormularioFinancieroPrivadoAnexo1AComponent } from './formulario-financiero-privado-anexo1a.component';
import { FormularioFinancieroPrivadoAnexo1BComponent } from './formulario-financiero-privado-anexo1b.component';
import { FormularioFinancieroPrivadoAnexo1CComponent } from './formulario-financiero-privado-anexo1c.component';
import { FormularioFinancieroPrivadoAnexo1DComponent } from './formulario-financiero-privado-anexo1d.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ControlInformacionComponent } from '../control-informacion/index';

export const FormularioFinancieroPrivadoRoute: Routes = [
    {
        path: 'dictamenes/formulario-financiero-privado-n1/:nCodffina',
        component: FormularioFinancieroPrivadoN1Component,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo1a/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo1AComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo1b/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo1BComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo1c/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo1CComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo1d/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo1DComponent,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
    }
];
