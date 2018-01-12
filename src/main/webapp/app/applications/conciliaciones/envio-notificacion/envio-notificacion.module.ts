import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule, CheckboxModule, ToggleButtonModule, CalendarModule, RadioButtonModule, DataTableModule,
    SharedModule, DialogModule, DropdownModule, PickListModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { EnvioNotificacionComponent, envioNotificacionRoute } from './';
import { SeleccionExpedienteComponent } from './envio-notificacion-wizard/seleccion-expediente.component';
import { VerificacionExpedienteComponent } from './envio-notificacion-wizard/verificacion-expediente.component';
import { ResumenNotificacionComponent } from './envio-notificacion-wizard/resumen-notificacion.component';

import { DatosWizardService } from './envio-notificacion-wizard/datos-wizard.service';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard/envio-notificacion-wizard.service';

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
        CheckboxModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        DropdownModule,
        PickListModule,
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
        DatosWizardService,
        EnvioNotificacionWizardService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EnvioNotificacionModule {}
