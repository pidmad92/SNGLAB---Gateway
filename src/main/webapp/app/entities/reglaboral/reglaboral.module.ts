import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ReglaboralService,
    ReglaboralComponent,
    reglaboralRoute,
} from './';

const ENTITY_STATES = [
    ...reglaboralRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReglaboralComponent,
    ],
    entryComponents: [
        ReglaboralComponent,
    ],
    providers: [
        ReglaboralService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayReglaboralModule {}
