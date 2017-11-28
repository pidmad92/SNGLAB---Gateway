import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    RevisarSolicitudesService,
    EvaluarSolicitudesService,
    RevisarSolicitudesComponent,
    EvaluarSolicitudesComponent,
    RevisarSolicitudesPopupRoute,
    RevisarSolicitudesRoute,
    EvaluarSolicitudesPopupComponent,
} from './';

import { RadioButtonModule, TabViewModule, InputTextModule, ChipsModule, CalendarModule, DataGridModule, DataTableModule, SharedModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...RevisarSolicitudesRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RadioButtonModule,
        TabViewModule,
        InputTextModule,
        ChipsModule,
        CalendarModule,
        DataGridModule,
        DataTableModule,
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RevisarSolicitudesComponent,
        EvaluarSolicitudesComponent,
        EvaluarSolicitudesPopupComponent,
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RevisarSolicitudesComponent,
        EvaluarSolicitudesComponent,
        EvaluarSolicitudesPopupComponent
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        RevisarSolicitudesService,
        EvaluarSolicitudesService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RevisarSolicitudesModule {}
