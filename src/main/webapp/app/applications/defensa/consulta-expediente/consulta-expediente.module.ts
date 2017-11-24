import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ConsultaExpedientePopupService,
    ConsultaExpedienteEmpleadorComponent,
    ConsultaExpedienteDialogComponent,
    ConsultaExpedienteComponent,
    ConsultaExpedientePopupComponent,
    consultaExpedienteRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...consultaExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        DataTableModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsultaExpedienteComponent,
        ConsultaExpedienteEmpleadorComponent,
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent
    ],
    entryComponents: [
        ConsultaExpedienteComponent,
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent
    ],
    providers: [
        ConsultaExpedientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
