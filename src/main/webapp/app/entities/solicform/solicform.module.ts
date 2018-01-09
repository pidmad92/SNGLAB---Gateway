import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SolicformService,
    SolicformComponent,
    solicformRoute,
} from './';

const ENTITY_STATES = [
    ...solicformRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SolicformComponent,
    ],
    entryComponents: [
        SolicformComponent,
    ],
    providers: [
        SolicformService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySolicformModule {}
