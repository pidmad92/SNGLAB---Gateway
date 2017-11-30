import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    AfiliarDesafiliarService,
    AfiliarDesafiliarComponent,
    AfiliarDesafiliarRoute,
    AfiliarDesafiliarPopupRoute,
    EvaluarAfiliarComponent,
    EvaluarAfiliarPopupComponent,
    EvaluarAfiliarService
} from './';

import { RadioButtonModule, TabViewModule, InputTextModule, ChipsModule, CalendarModule, DataGridModule, DataTableModule, SharedModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...AfiliarDesafiliarRoute,
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
        AfiliarDesafiliarComponent,
        EvaluarAfiliarComponent,
        EvaluarAfiliarPopupComponent,
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AfiliarDesafiliarComponent,
        EvaluarAfiliarComponent,
        EvaluarAfiliarPopupComponent
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        AfiliarDesafiliarService,
        EvaluarAfiliarService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AfiliarDesafiliarModule {}
