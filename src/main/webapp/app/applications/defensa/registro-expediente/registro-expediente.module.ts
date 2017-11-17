import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule, ToggleButtonModule, CalendarModule, RadioButtonModule, DataTableModule, SharedModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { RegistroExpedienteComponent, registroExpedienteRoute } from './';
import { DatosPaseComponent } from './registro-expediente-wizard/datos-pase.component';
import { DatosTrabajadorComponent } from './registro-expediente-wizard/datos-trabajador.component';
import { DatosEmpleadorComponent } from './registro-expediente-wizard/datos-empleador.component';
import { DatosExpedienteComponent } from './registro-expediente-wizard/datos-expediente.component';
import { DatosAudienciaComponent } from './registro-expediente-wizard/datos-audiencia.component';

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
        // AtencionEmpleadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroExpedienteModule {}
