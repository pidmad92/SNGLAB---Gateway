import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../shared';

import {
    UsusolService,
    UsusolComponent,
    ususolRoute,
} from './';

const ENTITY_STATES = [
    ...ususolRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        UsusolComponent,
    ],
    entryComponents: [
        UsusolComponent,
    ],
    providers: [
        UsusolService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUsusolModule {}
