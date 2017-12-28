import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ReporteComponent,
    // ConsultaExpedienteDialogComponent,
    // ConsultaExpedientePopupComponent,
    // ConsultaExpedientePopupService,
    reporteRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule , RadioButtonModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...reporteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        DataTableModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        RadioButtonModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReporteComponent,
        // ConsultaExpedientePopupComponent,
        // ConsultaExpedienteDialogComponent,
    ],
    entryComponents: [
        ReporteComponent,
        // ConsultaExpedientePopupComponent,
        // ConsultaExpedienteDialogComponent,
    ],
    providers: [
        // ConsultaExpedientePopupService,
        // ConsultaExpedienteArchivarPopupService,
        // ConsultaExpedienteObservarPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteModule {}
