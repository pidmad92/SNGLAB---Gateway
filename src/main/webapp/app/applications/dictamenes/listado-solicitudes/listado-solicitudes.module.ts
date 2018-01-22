import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabViewModule, DropdownModule, MessagesModule, MessageModule, BlockUIModule, MultiSelectModule } from 'primeng/primeng';

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

import {
    ListadoSolicitudesService,
    ListadoSolicitudesComponent,
    ListadoSolicitudesRoute,
} from './';

import {
    SolicformService,
    solicformRoute,
    SolicformComponent,
} from '../../../entities/solicform/';

import {
    DireccionService,
    direccionRoute,
    DireccionComponent,
} from '../../../entities/direccion/index';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlInformacionComponent } from '../control-informacion/index';
import { FormularioPerfilComponent, FormularioPerfilService } from '../formulario-perfil/index';
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
import {
    FormularioFinancieroPrivadoN1Component,
    FormularioFinancieroPrivadoAnexo1AComponent,
    FormularioFinancieroPrivadoAnexo1BComponent,
    FormularioFinancieroPrivadoAnexo1CComponent,
    FormularioFinancieroPrivadoAnexo1DComponent,
    FormularioFinancieroPrivadoService
} from '../formulario-financiero-privado/index';
import { FormularioFinancieroPrivadoN2Component } from '../formulario-financiero-privado/formulario-financiero-privado-n2.component';
import { FormularioFinancieroPrivadoAnexo2AComponent } from '../formulario-financiero-privado/formulario-financiero-privado-anexo2a.component';
import { FormularioFinancieroPrivadoAnexo2BComponent } from '../formulario-financiero-privado/formulario-financiero-privado-anexo2b.component';
import { FormularioFinancieroPrivadoAnexo2CComponent } from '../formulario-financiero-privado/formulario-financiero-privado-anexo2c.component';
import { FormularioFinancieroPrivadoN3Component } from '../formulario-financiero-privado/formulario-financiero-privado-n3.component';
import { FormfinancService, FormfinancDetalleService } from '../entities/index';
import {
    FormularioFinancieroFinancieroN1Component,
    FormularioFinancieroFinancieroN2Component,
    FormularioFinancieroFinancieroN2AComponent,
    FormularioFinancieroFinancieroN2BComponent,
    FormularioFinancieroFinancieroN2CComponent,
    FormularioFinancieroFinancieroN3Component,
    FormularioFinancieroFinancieroN4Component,
    FormularioFinancieroFinancieroN5Component,
    FormularioFinancieroFinancieroN6Component,
    FormularioFinancieroFinancieroService
} from '../formulario-financiero-financiero/index';

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
        FormularioFinancieroPrivadoN1Component,
        FormularioFinancieroPrivadoAnexo1AComponent,
        FormularioFinancieroPrivadoAnexo1BComponent,
        FormularioFinancieroPrivadoAnexo1CComponent,
        FormularioFinancieroPrivadoAnexo1DComponent,
        FormularioFinancieroPrivadoN2Component,
        FormularioFinancieroPrivadoAnexo2AComponent,
        FormularioFinancieroPrivadoAnexo2BComponent,
        FormularioFinancieroPrivadoAnexo2CComponent,
        FormularioFinancieroPrivadoN3Component,
        FormularioFinancieroFinancieroN1Component,
        FormularioFinancieroFinancieroN2Component,
        FormularioFinancieroFinancieroN2AComponent,
        FormularioFinancieroFinancieroN2BComponent,
        FormularioFinancieroFinancieroN2CComponent,
        FormularioFinancieroFinancieroN3Component,
        FormularioFinancieroFinancieroN4Component,
        FormularioFinancieroFinancieroN5Component,
        FormularioFinancieroFinancieroN6Component,
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
        FormularioFinancieroPrivadoService,
        FormularioFinancieroFinancieroService,
        FormfinancService,
        FormfinancDetalleService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayListadoSolicitudesModule { }
