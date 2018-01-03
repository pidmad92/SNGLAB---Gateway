import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

import {
    FormularioLaboralService,
    FormularioLaboralComponent,
    FormularioLaboralRoute,
} from './';

const ENTITY_STATES = [
    ...FormularioLaboralRoute,
];

@NgModule({
    declarations: [
        FormularioLaboralComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule,
        DropdownModule,
    ],
    entryComponents: [
        FormularioLaboralComponent,
    ],
    providers: [
        FormularioLaboralService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioLaboralModule { }
