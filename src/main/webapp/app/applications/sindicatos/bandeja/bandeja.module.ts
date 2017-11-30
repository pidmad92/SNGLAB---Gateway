import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    BandejaService,
    BandejaComponent,
    EvaluarService,
    EvaluarComponent,
    EvaluarPopupComponent,
    BandejaRoute,
} from './';

import { DropdownModule, RadioButtonModule, InputTextModule, TabViewModule, ChipsModule, CalendarModule, DataGridModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { SelectItem, FieldsetModule, CheckboxModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...BandejaRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        ChipsModule,
        FieldsetModule,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        DataTableModule,
        DropdownModule,
        TabViewModule,
        DataGridModule,
        CalendarModule,
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BandejaComponent,
        EvaluarPopupComponent,
        EvaluarComponent,
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        BandejaComponent,
        EvaluarPopupComponent,
        EvaluarComponent
        // EvaluarSolicitudesPopupComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        BandejaService,
        EvaluarService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BandejaModule {}
