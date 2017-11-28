import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    AudienciaComponent,
    AudienciaDialogComponent,
    AudienciaPopupComponent,
    AudienciaPopupService,
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
    audienciaRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...audienciaRoute
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
        AudienciaComponent,
        AudienciaPopupComponent,
        AudienciaDialogComponent,
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
        AudienciaPopupComponent,
        AudienciaDialogComponent,
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
        AudienciaPopupService,
        AudienciaAsignacionPopupService,
        AudienciaRegistroResultadoPopupService,
        AudienciaRegistroEscritoPopupService,
        AudienciaReprogramacionPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudienciaModule {}
