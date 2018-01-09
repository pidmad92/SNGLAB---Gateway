import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

import {
    FormularioFinancieroFinancieroService,
    FormularioFinancieroFinancieroN1Component,
    FormularioFinancieroFinancieroN2Component,
    FormularioFinancieroFinancieroN3Component,
    FormularioFinancieroFinancieroN4Component,
    FormularioFinancieroFinancieroN5Component,
    FormularioFinancieroFinancieroN6Component,
    FormularioFinancieroFinancieroN2AComponent,
    FormularioFinancieroFinancieroN2BComponent,
    FormularioFinancieroFinancieroN2CComponent,
    FormularioFinancieroFinancieroRoute,
} from './';
import { FormfinancService, FormfinancDetalleService } from '../entities/index';

const ENTITY_STATES = [
    ...FormularioFinancieroFinancieroRoute,
];

@NgModule({
    declarations: [
        FormularioFinancieroFinancieroN1Component,
        FormularioFinancieroFinancieroN2Component,
        FormularioFinancieroFinancieroN3Component,
        FormularioFinancieroFinancieroN4Component,
        FormularioFinancieroFinancieroN5Component,
        FormularioFinancieroFinancieroN6Component,
        FormularioFinancieroFinancieroN2AComponent,
        FormularioFinancieroFinancieroN2BComponent,
        FormularioFinancieroFinancieroN2CComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule,
        DropdownModule,
    ],
    entryComponents: [
        FormularioFinancieroFinancieroN1Component,
        FormularioFinancieroFinancieroN2Component,
        FormularioFinancieroFinancieroN3Component,
        FormularioFinancieroFinancieroN4Component,
        FormularioFinancieroFinancieroN5Component,
        FormularioFinancieroFinancieroN6Component,
        FormularioFinancieroFinancieroN2AComponent,
        FormularioFinancieroFinancieroN2BComponent,
        FormularioFinancieroFinancieroN2CComponent,
    ],
    providers: [
        FormularioFinancieroFinancieroService,
        FormfinancService,
        FormfinancDetalleService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioFinancieroFinancieroModule { }
