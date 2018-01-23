import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ConsultaExpedienteComponent,
    ConsultaExpedienteService,
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
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule, RadioButtonModule, ConfirmDialogModule, BlockUIModule } from 'primeng/primeng';
import {GrowlModule} from 'primeng/components/growl/growl';

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
        RadioButtonModule,
        ConfirmDialogModule,
        BlockUIModule,
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
        ConsultaExpedienteService,
        ConsultaExpedientePopupService,
        ConsultaExpedienteArchivarPopupService,
        ConsultaExpedienteObservarPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
