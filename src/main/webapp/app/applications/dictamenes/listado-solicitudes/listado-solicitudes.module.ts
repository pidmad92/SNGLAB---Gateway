import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule} from 'primeng/primeng';

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

import {
    SolicformService,
    solicformRoute,
    SolicformComponent,
} from '../../../entities/solicform/';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ControlInformacionComponent } from '../control-informacion/index';

const ENTITY_STATES = [
    ...ListadoSolicitudesRoute,
];

@NgModule({
    declarations: [
        ListadoSolicitudesComponent,
        SolicitudComponent,
        SolicitudDialogComponent,
        SolicitudPopupComponent,
        ControlInformacionComponent,
        SolicformComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
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
        SolicformService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayListadoSolicitudesModule {}
