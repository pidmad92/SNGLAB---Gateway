import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioPerfilComponent } from './formulario-perfil.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { ControlInformacionComponent } from '../control-informacion/index';
import { FormularioPerfil2Component } from './formulario-perfil2.component';
import { FormularioPerfil3Component } from './formulario-perfil3.component';
import { FormularioPerfil4Component } from './formulario-perfil4.component';
import { FormularioPerfil5Component } from './formulario-perfil5.component';
import { FormularioPerfil6Component } from './formulario-perfil6.component';

export const FormularioPerfilRoute: Routes = [
    {
        path: 'dictamenes/formulario-perfil',
        component: FormularioPerfilComponent,
    }, {
        path: 'dictamenes/control-informacion/:nCodsolic',
        component: ControlInformacionComponent,
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
    }
];
