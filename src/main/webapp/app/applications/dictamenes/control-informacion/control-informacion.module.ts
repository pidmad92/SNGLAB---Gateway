import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule} from 'primeng/primeng';

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

import { ControlInformacionService,
    ControlInformacionComponent,
    ControlInformacionRoute,
} from './';
import { FormularioPerfilComponent } from '../formulario-perfil/index';
import { FormperfilService, FormperfilComponent } from '../../../entities/formperfil/index';
import { DireccionService, DireccionComponent } from '../../../entities/direccion/index';
import { ActieconService,
        ActieconComponent,
        actieconRoute,
} from '../../../entities/actiecon';
import { FormularioPerfil2Component } from '../formulario-perfil/formulario-perfil2.component';
import { FormularioPerfil3Component } from '../formulario-perfil/formulario-perfil3.component';
import { FormularioPerfil4Component } from '../formulario-perfil/formulario-perfil4.component';
import { FormularioPerfil5Component } from '../formulario-perfil/formulario-perfil5.component';
import { FormularioPerfil6Component } from '../formulario-perfil/formulario-perfil6.component';
import { NegocolectService, NegocolectComponent } from '../../../entities/negocolect/index';
import { ValidarUsuarioService } from '../../denuncias/validar-usuario/validarusuario.service';
import { ValidarUsuarioComponent } from '../../denuncias/validar-usuario/index';

const ENTITY_STATES = [
    ...ControlInformacionRoute,
];

@NgModule({
    declarations: [
        ControlInformacionComponent,
        SolicitudComponent,
        SolicformComponent,
        DireccionComponent,
        FormperfilComponent,
        FormularioPerfilComponent,
        FormularioPerfil2Component,
        FormularioPerfil3Component,
        FormularioPerfil4Component,
        FormularioPerfil5Component,
        FormularioPerfil6Component,
        ActieconComponent,
        NegocolectComponent,
        ValidarUsuarioComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule
    ],
    entryComponents: [
        ControlInformacionComponent
    ],
    providers: [
        ControlInformacionService,
        DireccionService,
        SolicitudService,
        SolicformService,
        FormperfilService,
        ActieconService,
        NegocolectService,
        ValidarUsuarioService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayControlInformacionModule {}
