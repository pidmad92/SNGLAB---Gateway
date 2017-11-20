import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { ConsultaExpedienteEmpleadorComponent, ConsultaExpedienteTrabajadorComponent, ConsultaExpedienteComponent, consultaExpedienteRoute } from './';
import { TabViewModule, DataTableModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...consultaExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        DataTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsultaExpedienteComponent,
        ConsultaExpedienteEmpleadorComponent,
        ConsultaExpedienteTrabajadorComponent,
    ],
    entryComponents: [
        ConsultaExpedienteComponent,
        ConsultaExpedienteEmpleadorComponent,
        ConsultaExpedienteTrabajadorComponent
    ],
    providers: [
        // AtencionEmpleadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
