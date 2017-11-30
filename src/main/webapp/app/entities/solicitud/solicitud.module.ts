import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {ReporteresService} from '../reporteres/';

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
} from './';

const ENTITY_STATES = [
    ...solicitudRoute,
    ...solicitudPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
    ],
    declarations: [
        SolicitudComponent,
        SolicitudDetailComponent,
        SolicitudDialogComponent,
        SolicitudDeleteDialogComponent,
        SolicitudPopupComponent,
        SolicitudDeletePopupComponent,
    ],
    entryComponents: [
        SolicitudComponent,
        SolicitudDialogComponent,
        SolicitudPopupComponent,
        SolicitudDeleteDialogComponent,
        SolicitudDeletePopupComponent,
    ],
    providers: [
        SolicitudService,
        SolicitudPopupService,
        ReporteresService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySolicitudModule {}
