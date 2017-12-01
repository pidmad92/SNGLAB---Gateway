import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

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
import { ValidarUsuarioService } from '../../denuncias/validar-usuario/validarusuario.service';
import { ValidarUsuarioComponent } from '../../denuncias/validar-usuario/index';
import { ResulnegocService, ResulnegocComponent } from '../../../entities/resulnegoc/index';
import { RespinformaService, RespinformaComponent } from '../../../entities/respinforma/index';
import { AnexlaboralService, AnexlaboralComponent } from '../../../entities/anexlaboral/index';

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
        ValidarUsuarioComponent,
        ResulnegocComponent,
        RespinformaComponent,
        AnexlaboralComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule,
        DropdownModule,
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
        ValidarUsuarioService,
        ResulnegocService,
        RespinformaService,
        AnexlaboralService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioPerfilModule { }
