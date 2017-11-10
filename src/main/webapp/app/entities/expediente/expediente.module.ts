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
    ExpedienteResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...expedienteRoute,
    ...expedientePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
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
        ExpedienteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayExpedienteModule {}
