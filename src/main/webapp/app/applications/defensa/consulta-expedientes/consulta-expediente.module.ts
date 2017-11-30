import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ConsultaExpedienteComponent,
    ConsultaExpedienteDialogComponent,
    ConsultaExpedientePopupComponent,
    ConsultaExpedientePopupService,
    ConsultaExpedienteArchivarDialogComponent,
    ConsultaExpedienteArchivarPopupComponent,
    ConsultaExpedienteArchivarPopupService,
    ConsultaExpedienteObservarDialogComponent,
    ConsultaExpedienteObservarPopupComponent,
    ConsultaExpedienteObservarPopupService,
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
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent,
        ConsultaExpedienteArchivarDialogComponent,
        ConsultaExpedienteArchivarPopupComponent,
        ConsultaExpedienteObservarDialogComponent,
        ConsultaExpedienteObservarPopupComponent

    ],
    entryComponents: [
        ConsultaExpedienteComponent,
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent,
        ConsultaExpedienteArchivarDialogComponent,
        ConsultaExpedienteArchivarPopupComponent,
        ConsultaExpedienteObservarDialogComponent,
        ConsultaExpedienteObservarPopupComponent
    ],
    providers: [
        ConsultaExpedientePopupService,
        ConsultaExpedienteArchivarPopupService,
        ConsultaExpedienteObservarPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
