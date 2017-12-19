import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PerreglabService,
    PerreglabComponent,
    perreglabRoute,
} from './';

const ENTITY_STATES = [
    ...perreglabRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerreglabComponent,
    ],
    entryComponents: [
        PerreglabComponent,
    ],
    providers: [
        PerreglabService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPerreglabModule {}
