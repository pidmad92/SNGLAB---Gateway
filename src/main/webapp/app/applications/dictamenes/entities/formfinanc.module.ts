import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    FormfinancService,
} from './';
import { GatewaySharedModule } from '../../../shared/index';

const ENTITY_STATES = [];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [],
    entryComponents: [],
    providers: [
        FormfinancService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormfinancModule {}
