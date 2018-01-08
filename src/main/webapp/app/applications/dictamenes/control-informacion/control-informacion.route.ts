import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ControlInformacionComponent } from './control-informacion.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ListadoSolicitudesComponent } from '../listado-solicitudes/index';
import { FormularioPerfilComponent } from '../formulario-perfil/index';
import { FormularioPerfil2Component } from '../formulario-perfil/formulario-perfil2.component';
import { FormularioPerfil3Component } from '../formulario-perfil/formulario-perfil3.component';
import { FormularioPerfil4Component } from '../formulario-perfil/formulario-perfil4.component';
import { FormularioPerfil5Component } from '../formulario-perfil/formulario-perfil5.component';
import { FormularioPerfil6Component } from '../formulario-perfil/formulario-perfil6.component';
import { FormularioFinancieroN1Component,
         FormularioFinancieroAnexo1AComponent,
         FormularioFinancieroAnexo1BComponent,
         FormularioFinancieroAnexo1CComponent,
         FormularioFinancieroAnexo1DComponent } from '../formulario-financiero/index';
import { FormularioFinancieroN2Component } from '../formulario-financiero/formulario-financiero-n2.component';
import { FormularioFinancieroAnexo2AComponent } from '../formulario-financiero/formulario-financiero-anexo2a.component';
import { FormularioFinancieroAnexo2BComponent } from '../formulario-financiero/formulario-financiero-anexo2b.component';
import { FormularioFinancieroAnexo2CComponent } from '../formulario-financiero/formulario-financiero-anexo2c.component';
import { FormularioFinancieroN3Component } from '../formulario-financiero/formulario-financiero-n3.component';

export const ControlInformacionRoute: Routes = [
    {
        path: 'dictamenes/control-informacion',
        component: ControlInformacionComponent,
    }, {
        path: 'dictamenes/listado-solicitudes',
        component: ListadoSolicitudesComponent,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
        children: []
    }, {
        path: 'dictamenes/formulario-perfil/:nCodfperf',
        component: FormularioPerfilComponent,
    }, {
        path: 'dictamenes/formulario-perfil2',
        component: FormularioPerfil2Component,
    }, {
        path: 'dictamenes/formulario-perfil3',
        component: FormularioPerfil3Component,
    }, {
        path: 'dictamenes/formulario-perfil4',
        component: FormularioPerfil4Component,
    }, {
        path: 'dictamenes/formulario-perfil5',
        component: FormularioPerfil5Component,
    }, {
        path: 'dictamenes/formulario-perfil6',
        component: FormularioPerfil6Component,
    }, {
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
        path: 'dictamenes/formulario-financiero-n2/:nCodffina',
        component: FormularioFinancieroN2Component,
    }, {
        path: 'dictamenes/formulario-financiero-anexo2a/:nCodffina',
        component: FormularioFinancieroAnexo2AComponent,
    }, {
        path: 'dictamenes/formulario-financiero-anexo2b/:nCodffina',
        component: FormularioFinancieroAnexo2BComponent,
    }, {
        path: 'dictamenes/formulario-financiero-anexo2c/:nCodffina',
        component: FormularioFinancieroAnexo2CComponent,
    }, {
        path: 'dictamenes/formulario-financiero-n3/:nCodffina',
        component: FormularioFinancieroN3Component,
    },
];
