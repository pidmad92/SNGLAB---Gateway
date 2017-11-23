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
} from './';

const ENTITY_STATES = [
    ...RevisarSolicitudesRoute,
    ...RevisarSolicitudesPopupRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RevisarSolicitudesComponent,
        EvaluarSolicitudesComponent,
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
