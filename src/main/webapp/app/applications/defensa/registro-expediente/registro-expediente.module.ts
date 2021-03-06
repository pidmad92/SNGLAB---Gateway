import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule, ToggleButtonModule, CalendarModule, RadioButtonModule, DataTableModule, SharedModule, DialogModule, DropdownModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { RegistroExpedienteComponent, registroExpedienteRoute } from './';
import { DatosPaseComponent } from './registro-expediente-wizard/datos-pase.component';
import { DatosTrabajadorComponent } from './registro-expediente-wizard/datos-trabajador.component';
import { DatosEmpleadorComponent } from './registro-expediente-wizard/datos-empleador.component';
import { DatosExpedienteComponent } from './registro-expediente-wizard/datos-expediente.component';
import { DatosAudienciaComponent } from './registro-expediente-wizard/datos-audiencia.component';

import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';

import { RegistroExpedienteService } from './registro-expediente.service';
import { DatosWizardService } from './registro-expediente-wizard/datos-wizard.service';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard/registro-expediente-wizard.service';

const ENTITY_STATES = [
     ...registroExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        MessagesModule,
        MessageModule,
        StepsModule,
        ToggleButtonModule,
        CalendarModule,
        RadioButtonModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        DropdownModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroExpedienteComponent,
        DatosPaseComponent,
        DatosTrabajadorComponent,
        DatosEmpleadorComponent,
        DatosExpedienteComponent,
        DatosAudienciaComponent
    ],
    entryComponents: [
        RegistroExpedienteComponent,
        DatosPaseComponent,
        DatosTrabajadorComponent,
        DatosEmpleadorComponent,
        DatosExpedienteComponent,
        DatosAudienciaComponent
    ],
    providers: [
        RegistroExpedienteService,
        RegistroExpedienteWizardService,
        DatosWizardService,
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroExpedienteModule {}
