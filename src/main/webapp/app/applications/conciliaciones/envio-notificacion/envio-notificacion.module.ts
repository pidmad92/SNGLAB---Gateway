import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule, ToggleButtonModule, CalendarModule, RadioButtonModule, DataTableModule, SharedModule, DialogModule, DropdownModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { EnvioNotificacionComponent, envioNotificacionRoute } from './';
import { SeleccionExpedienteComponent } from './envio-notificacion-wizard/seleccion-expediente.component';
import { VerificacionExpedienteComponent } from './envio-notificacion-wizard/verificacion-expediente.component';
import { ResumenNotificacionComponent } from './envio-notificacion-wizard/resumen-notificacion.component';

const ENTITY_STATES = [
     ...envioNotificacionRoute
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
        EnvioNotificacionComponent,
        SeleccionExpedienteComponent,
        VerificacionExpedienteComponent,
        ResumenNotificacionComponent,
    ],
    entryComponents: [
        EnvioNotificacionComponent,
        SeleccionExpedienteComponent,
        VerificacionExpedienteComponent,
        ResumenNotificacionComponent
    ],
    providers: [
        // AtencionEmpleadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EnvioNotificacionModule {}
