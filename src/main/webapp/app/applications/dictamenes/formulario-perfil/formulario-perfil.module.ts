import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem } from 'primeng/primeng';

import {
    SolicitudService,
    solicitudRoute,
    SolicitudComponent,
} from '../../../entities/solicitud/';

import {
    SolicformService,
    solicformRoute,
    SolicformComponent,
} from '../../../entities/solicform/';

import {
    FormularioPerfilService,
    FormularioPerfilComponent,
    FormularioPerfilRoute,
} from './';

import {
    DireccionService,
    direccionRoute,
    DireccionComponent
} from '../../../entities/direccion/index';
import {
    FormperfilComponent,
    formperfilRoute,
    FormperfilService
} from '../../../entities/formperfil/index';

import {
    ActieconService,
    ActieconComponent,
    actieconRoute,
} from '../../../entities/actiecon';
import { FormularioPerfil2Component } from './formulario-perfil2.component';
import { FormularioPerfil3Component } from './formulario-perfil3.component';
import { FormularioPerfil4Component } from './formulario-perfil4.component';
import { FormularioPerfil5Component } from './formulario-perfil5.component';
import { FormularioPerfil6Component } from './formulario-perfil6.component';
import { NegocolectService, NegocolectComponent } from '../../../entities/negocolect/index';

const ENTITY_STATES = [
    ...FormularioPerfilRoute,
];

@NgModule({
    declarations: [
        FormularioPerfilComponent,
        SolicitudComponent,
        SolicformComponent,
        DireccionComponent,
        FormularioPerfilComponent,
        FormularioPerfil2Component,
        FormularioPerfil3Component,
        FormularioPerfil4Component,
        FormularioPerfil5Component,
        FormularioPerfil6Component,
        ActieconComponent,
        NegocolectComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule
    ],
    entryComponents: [
        FormularioPerfilComponent,
    ],
    providers: [
        FormularioPerfilService,
        DireccionService,
        SolicitudService,
        SolicformService,
        FormperfilService,
        ActieconService,
        NegocolectService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioPerfilModule { }
