import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EvaluarSolicitudesComponent } from './evaluar-solicitudes.component';

import { GatewaySharedModule } from '../../../shared';
import { RevisarSolicitudesService,
    RevisarSolicitudesComponent,
    RevisarSolicitudesRoute,
} from './';

const ENTITY_STATES = [
    ...RevisarSolicitudesRoute,
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
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RevisarSolicitudesComponent,
        EvaluarSolicitudesComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        RevisarSolicitudesService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RevisarSolicitudesModule {}
