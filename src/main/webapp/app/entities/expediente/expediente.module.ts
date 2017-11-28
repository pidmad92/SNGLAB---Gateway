import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ExpedienteService,
    ExpedientePopupService,
    ExpedienteComponent,
    ExpedienteDetailComponent,
    ExpedienteDialogComponent,
    ExpedientePopupComponent,
    ExpedienteDeletePopupComponent,
    ExpedienteDeleteDialogComponent,
    expedienteRoute,
    expedientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...expedienteRoute,
    ...expedientePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExpedienteComponent,
        ExpedienteDetailComponent,
        ExpedienteDialogComponent,
        ExpedienteDeleteDialogComponent,
        ExpedientePopupComponent,
        ExpedienteDeletePopupComponent,
    ],
    entryComponents: [
        ExpedienteComponent,
        ExpedienteDialogComponent,
        ExpedientePopupComponent,
        ExpedienteDeleteDialogComponent,
        ExpedienteDeletePopupComponent,
    ],
    providers: [
        ExpedienteService,
        ExpedientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayExpedienteModule {}
