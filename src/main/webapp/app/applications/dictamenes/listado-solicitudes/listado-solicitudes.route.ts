import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ListadoSolicitudesComponent } from './listado-solicitudes.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { SolicitudPopupComponent } from '../../../entities/solicitud/solicitud-dialog.component';
import { ControlInformacionComponent } from '../control-informacion/index';
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

export const ListadoSolicitudesRoute: Routes = [
    {
        path: 'dictamenes/listado-solicitudes',
        component: ListadoSolicitudesComponent,
        children: []
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
    },
];
