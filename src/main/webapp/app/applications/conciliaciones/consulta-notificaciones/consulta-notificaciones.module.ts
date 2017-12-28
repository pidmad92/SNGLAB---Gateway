import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ConsultaNotificacionesComponent,
    ConsultaNotificacionesDialogComponent,
    ConsultaNotificacionesPopupComponent,
    ConsultaNotificacionesPopupService,
    consultaNotificacionesRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...consultaNotificacionesRoute
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
        ConsultaNotificacionesComponent,
        ConsultaNotificacionesPopupComponent,
        ConsultaNotificacionesDialogComponent,

    ],
    entryComponents: [
        ConsultaNotificacionesComponent,
        ConsultaNotificacionesPopupComponent,
        ConsultaNotificacionesDialogComponent,
    ],
    providers: [
        ConsultaNotificacionesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaNotificacionesModule {}
