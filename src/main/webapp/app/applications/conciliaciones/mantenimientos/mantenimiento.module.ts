import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    MantenimientoResultadoComponent,
    MantenimientoResultadoDialogComponent,
    MantenimientoResultadoPopupComponent,
    MantenimientoResultadoDeleteDialogComponent,
    MantenimientoResultadoDeletePopupComponent,
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
        MantenimientoResultadoPopupComponent,
        MantenimientoResultadoDeleteDialogComponent,
        MantenimientoResultadoDeletePopupComponent
    ],
    entryComponents: [
        MantenimientoResultadoComponent,
        MantenimientoAudienciaComponent,
        MantenimientoResultadoDialogComponent,
        MantenimientoResultadoPopupComponent,
        MantenimientoResultadoDeleteDialogComponent,
        MantenimientoResultadoDeletePopupComponent
   ],
    providers: [
        ResulconciService,
        MantenimientoResultadoPopupService,
        TipresconcService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MantenimientoModule {}
