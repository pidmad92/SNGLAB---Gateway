import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    MantenimientoResultadoComponent,
    MantenimientoResultadoDialogComponent,
    MantenimientoResultadoPopupComponent,
    MantenimientoResultadoPopupService,
    MantenimientoAudienciaComponent,
    ResulconciService,
    TipresconcService,
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
        MantenimientoResultadoComponent,
        MantenimientoAudienciaComponent,
        MantenimientoResultadoDialogComponent,
        MantenimientoResultadoPopupComponent
    ],
    entryComponents: [
        MantenimientoResultadoComponent,
        MantenimientoAudienciaComponent,
        MantenimientoResultadoDialogComponent,
        MantenimientoResultadoPopupComponent
   ],
    providers: [
        ResulconciService,
        MantenimientoResultadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MantenimientoModule {}
