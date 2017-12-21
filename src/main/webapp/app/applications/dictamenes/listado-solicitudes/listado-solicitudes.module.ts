import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule, TabViewModule, DropdownModule, MessagesModule, MessageModule, BlockUIModule, MultiSelectModule} from 'primeng/primeng';

import {
    SolicitudService,
    SolicitudPopupService,
    SolicitudComponent,
    SolicitudDetailComponent,
    SolicitudDialogComponent,
    SolicitudPopupComponent,
    SolicitudDeletePopupComponent,
    SolicitudDeleteDialogComponent,
    solicitudRoute,
    solicitudPopupRoute,
} from '../../../entities/solicitud/';

import { ListadoSolicitudesService,
    ListadoSolicitudesComponent,
    ListadoSolicitudesRoute,
} from './';

import {
    SolicformService,
    solicformRoute,
    SolicformComponent,
} from '../../../entities/solicform/';

import { DireccionService,
    direccionRoute,
    DireccionComponent,
} from '../../../entities/direccion/index';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlInformacionComponent } from '../control-informacion/index';
import { FormularioPerfilComponent, FormularioPerfilService } from '../formulario-perfil/index';
import { FormperfilComponent,
         formperfilRoute,
         FormperfilService } from '../../../entities/formperfil/index';

         import { ActieconService,
            ActieconComponent,
            actieconRoute,
    } from '../../../entities/actiecon';
import { FormularioPerfil2Component } from '../formulario-perfil/formulario-perfil2.component';
import { FormularioPerfil3Component } from '../formulario-perfil/formulario-perfil3.component';
import { FormularioPerfil4Component } from '../formulario-perfil/formulario-perfil4.component';
import { FormularioPerfil5Component } from '../formulario-perfil/formulario-perfil5.component';
import { FormularioPerfil6Component } from '../formulario-perfil/formulario-perfil6.component';
import { UndnegocioComponent, UndnegocioService } from '../../../entities/undnegocio/index';
import { HechoinverService, HechoinverComponent } from '../../../entities/hechoinver/index';
import { ParticipaService, ParticipaComponent } from '../../../entities/participa/index';
import { NegocolectService, NegocolectComponent } from '../../../entities/negocolect/index';
import { ResulnegocService, ResulnegocComponent } from '../../../entities/resulnegoc/index';
import { RespinformaService, RespinformaComponent } from '../../../entities/respinforma/index';
import { AnexlaboralService, AnexlaboralComponent } from '../../../entities/anexlaboral/index';
import { DecimalMask } from '../../general/decimal.directive';
import { TipdocService, TipdocComponent } from '../../../entities/tipdoc/index';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { ReglaboralService } from '../../../entities/reglaboral/index';
import { PerreglabService } from '../../../entities/perreglab/index';

const ENTITY_STATES = [
    ...ListadoSolicitudesRoute,
];

@NgModule({
    declarations: [
        ListadoSolicitudesComponent,
        SolicitudComponent,
        ControlInformacionComponent,
        SolicformComponent,
        FormularioPerfilComponent,
        FormularioPerfil2Component,
        FormularioPerfil3Component,
        FormularioPerfil4Component,
        FormularioPerfil5Component,
        FormularioPerfil6Component,
        DireccionComponent,
        HechoinverComponent,
        ParticipaComponent,
        FormperfilComponent,
        ActieconComponent,
        UndnegocioComponent,
        NegocolectComponent,
        ResulnegocComponent,
        RespinformaComponent,
        AnexlaboralComponent,
        DecimalMask,
        TipdocComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        TabViewModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        BlockUIModule,
        MultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        ListadoSolicitudesComponent,
    ],
    providers: [
        ListadoSolicitudesService,
        DireccionService,
        UndnegocioService,
        HechoinverService,
        ParticipaService,
        SolicitudService,
        SolicformService,
        FormperfilService,
        ActieconService,
        NegocolectService,
        ResulnegocService,
        RespinformaService,
        AnexlaboralService,
        TipdocService,
        FormularioPerfilService,
        ReglaboralService,
        PerreglabService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayListadoSolicitudesModule {}
