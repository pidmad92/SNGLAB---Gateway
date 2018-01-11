import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioFinancieroFinancieroN1Component } from './formulario-financiero-financiero-n1.component';
import { FormularioFinancieroFinancieroN2Component } from './formulario-financiero-financiero-n2.component';
import { FormularioFinancieroFinancieroN2AComponent } from './formulario-financiero-financiero-n2a.component';
import { FormularioFinancieroFinancieroN2BComponent } from './formulario-financiero-financiero-n2b.component';
import { FormularioFinancieroFinancieroN2CComponent } from './formulario-financiero-financiero-n2c.component';
import { FormularioFinancieroFinancieroN3Component } from './formulario-financiero-financiero-n3.component';
import { FormularioFinancieroFinancieroN4Component } from './formulario-financiero-financiero-n4.component';
import { FormularioFinancieroFinancieroN5Component } from './formulario-financiero-financiero-n5.component';
import { FormularioFinancieroFinancieroN6Component } from './formulario-financiero-financiero-n6.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ControlInformacionComponent } from '../control-informacion/index';

export const FormularioFinancieroFinancieroRoute: Routes = [
    {
        path: 'dictamenes/formulario-financiero-financiero-n1/:nCodffina',
        component: FormularioFinancieroFinancieroN1Component,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-n2/:nCodffina',
        component: FormularioFinancieroFinancieroN2Component,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-anexo2a/:nCodffina',
        component: FormularioFinancieroFinancieroN2AComponent,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-anexo2b/:nCodffina',
        component: FormularioFinancieroFinancieroN2BComponent,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-anexo2c/:nCodffina',
        component: FormularioFinancieroFinancieroN2CComponent,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-n3/:nCodffina',
        component: FormularioFinancieroFinancieroN3Component,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-n4/:nCodffina',
        component: FormularioFinancieroFinancieroN4Component,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-n5/:nCodffina',
        component: FormularioFinancieroFinancieroN5Component,
    }, {
        path: 'dictamenes/formulario-financiero-financiero-n6/:nCodffina',
        component: FormularioFinancieroFinancieroN6Component,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
    }
];
