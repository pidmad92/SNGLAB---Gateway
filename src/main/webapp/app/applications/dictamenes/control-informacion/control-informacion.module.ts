import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule, TabMenuModule, DropdownModule} from 'primeng/primeng';

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
import { ResulnegocService, ResulnegocComponent } from '../../../entities/resulnegoc/index';
import { RespinformaService, RespinformaComponent } from '../../../entities/respinforma/index';
import { AnexlaboralComponent, AnexlaboralService } from '../../../entities/anexlaboral/index';

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
        ResulnegocService,
        RespinformaService,
        AnexlaboralService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayControlInformacionModule {}
