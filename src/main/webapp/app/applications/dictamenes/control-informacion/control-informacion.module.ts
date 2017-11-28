import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule} from 'primeng/primeng';

import {
    SolicitudService,
    solicitudRoute,
    SolicitudComponent,
} from '../../../entities/solicitud/';

import {
    SolicformService,
    solicformRoute,
    SolicformComponent,
} from '../../../entities/solicform/';

import { ControlInformacionService,
    ControlInformacionComponent,
    ControlInformacionRoute,
} from './';

const ENTITY_STATES = [
    ...ControlInformacionRoute,
];

@NgModule({
    declarations: [
        ControlInformacionComponent,
        SolicitudComponent,
        SolicformComponent
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule
    ],
    entryComponents: [
        ControlInformacionComponent
    ],
    providers: [
        ControlInformacionService,
        SolicitudService,
        SolicformService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayControlInformacionModule {}
