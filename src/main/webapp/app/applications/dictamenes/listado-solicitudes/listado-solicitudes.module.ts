import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';

import {
    SolicitudService,
    SolicitudPopupService,
    SolicitudComponent,
    SolicitudDetailComponent,
    SolicitudDialogComponent,
    SolicitudPopupComponent,
    SolicitudDeletePopupComponent,
    SolicitudDeleteDialogComponent,
    solicitudRoute,
    solicitudPopupRoute,
} from '../../../entities/solicitud/';

import { ListadoSolicitudesService,
    ListadoSolicitudesComponent,
    ListadoSolicitudesRoute,
} from './';

const ENTITY_STATES = [
    ...ListadoSolicitudesRoute,
];

@NgModule({
    declarations: [
        ListadoSolicitudesComponent,
        SolicitudComponent,
        SolicitudDialogComponent,
        SolicitudPopupComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    entryComponents: [
        ListadoSolicitudesComponent,
        SolicitudDialogComponent,
        SolicitudPopupComponent,
    ],
    providers: [
        ListadoSolicitudesService,
        SolicitudService,
        SolicitudPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayListadoSolicitudesModule {}
