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

import { RegistroExpedienteService } from './registro-expediente.service';
import { DatosPaseService } from './registro-expediente-wizard/datos-pase.service';

const ENTITY_STATES = [
     ...registroExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
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
        DatosPaseService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroExpedienteModule {}
