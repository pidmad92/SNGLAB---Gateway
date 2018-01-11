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
import { FormularioFinancieroPrivadoN1Component,
    FormularioFinancieroPrivadoAnexo1AComponent,
    FormularioFinancieroPrivadoAnexo1BComponent,
    FormularioFinancieroPrivadoAnexo1CComponent,
    FormularioFinancieroPrivadoAnexo1DComponent,
    FormularioFinancieroPrivadoN2Component,
    FormularioFinancieroPrivadoAnexo2AComponent,
    FormularioFinancieroPrivadoAnexo2BComponent,
    FormularioFinancieroPrivadoAnexo2CComponent,
    FormularioFinancieroPrivadoN3Component} from '../formulario-financiero-privado/index';
import { FormularioFinancieroFinancieroN1Component,
        FormularioFinancieroFinancieroN2Component,
        FormularioFinancieroFinancieroN3Component,
        FormularioFinancieroFinancieroN4Component,
        FormularioFinancieroFinancieroN5Component,
        FormularioFinancieroFinancieroN6Component,
        FormularioFinancieroFinancieroN2AComponent,
        FormularioFinancieroFinancieroN2BComponent,
        FormularioFinancieroFinancieroN2CComponent} from '../formulario-financiero-financiero/index';

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
        path: 'dictamenes/formulario-financiero-privado-n2/:nCodffina',
        component: FormularioFinancieroPrivadoN2Component,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo2a/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo2AComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo2b/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo2BComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-anexo2c/:nCodffina',
        component: FormularioFinancieroPrivadoAnexo2CComponent,
    }, {
        path: 'dictamenes/formulario-financiero-privado-n3/:nCodffina',
        component: FormularioFinancieroPrivadoN3Component,
    }, {
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
    },
];
