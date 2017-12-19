import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import {
    AudienciaComponent,
    AudienciaConsultaComponent,
    AudienciaConsultaDialogComponent,
    AudienciaConsultaPopupComponent,
    AudienciaConsultaPopupService,
    AudienciaAsignacionDialogComponent,
    AudienciaAsignacionPopupComponent,
    AudienciaAsignacionPopupService,
    AudienciaRegistroEscritoDialogComponent,
    AudienciaRegistroEscritoPopupComponent,
    AudienciaRegistroEscritoPopupService,
    AudienciaReprogramacionDialogComponent,
    AudienciaReprogramacionPopupComponent,
    AudienciaReprogramacionPopupService,
    AudienciaRegistroResultadoDialogComponent,
    AudienciaRegistroResultadoPopupComponent,
    AudienciaRegistroResultadoPopupService,
    ConciliaService,
    ExpedienteService,
    AbogadoService,
    HoraconService,
    ResulconciService,
    audienciaRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...audienciaRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        MessageModule,
        MessagesModule,
        DataTableModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AudienciaComponent,
        AudienciaConsultaComponent,
        AudienciaConsultaPopupComponent,
        AudienciaConsultaDialogComponent,
        AudienciaAsignacionDialogComponent,
        AudienciaAsignacionPopupComponent,
        AudienciaRegistroResultadoDialogComponent,
        AudienciaRegistroResultadoPopupComponent,
        AudienciaReprogramacionDialogComponent,
        AudienciaReprogramacionPopupComponent,
        AudienciaRegistroEscritoDialogComponent,
        AudienciaRegistroEscritoPopupComponent

    ],
    entryComponents: [
        AudienciaComponent,
        AudienciaConsultaPopupComponent,
        AudienciaConsultaDialogComponent,
        AudienciaAsignacionDialogComponent,
        AudienciaAsignacionPopupComponent,
        AudienciaRegistroResultadoDialogComponent,
        AudienciaRegistroResultadoPopupComponent,
        AudienciaReprogramacionDialogComponent,
        AudienciaReprogramacionPopupComponent,
        AudienciaRegistroEscritoDialogComponent,
        AudienciaRegistroEscritoPopupComponent
    ],
    providers: [
        AudienciaConsultaPopupService,
        AudienciaAsignacionPopupService,
        AudienciaRegistroResultadoPopupService,
        AudienciaRegistroEscritoPopupService,
        AudienciaReprogramacionPopupService,
        ConciliaService,
        ExpedienteService,
        MessageService,
        AbogadoService,
        ResulconciService,
        HoraconService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudienciaModule {}
