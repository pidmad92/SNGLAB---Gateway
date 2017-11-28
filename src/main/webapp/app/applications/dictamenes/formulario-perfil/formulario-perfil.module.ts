import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {DialogModule} from 'primeng/primeng';

import { FormularioPerfilService,
    FormularioPerfilComponent,
    FormularioPerfilRoute,
} from './';

const ENTITY_STATES = [
    ...FormularioPerfilRoute,
];

@NgModule({
    declarations: [
        FormularioPerfilComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
    ],
    entryComponents: [
        FormularioPerfilComponent,
    ],
    providers: [
        FormularioPerfilService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioPerfilModule {}
