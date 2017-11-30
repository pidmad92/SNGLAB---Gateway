import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    MantenimientoComponent,
    MantenimientoDialogComponent,
    MantenimientoPopupComponent,
    MantenimientoPopupService,
    mantenimientoRoute } from './';
import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...mantenimientoRoute
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
        MantenimientoComponent,
        MantenimientoPopupComponent,
        MantenimientoDialogComponent,
    ],
    entryComponents: [
        MantenimientoComponent,
        MantenimientoPopupComponent,
        MantenimientoDialogComponent,
   ],
    providers: [
        MantenimientoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MantenimientoModule {}
