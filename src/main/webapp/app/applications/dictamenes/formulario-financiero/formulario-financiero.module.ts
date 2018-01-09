import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

import {
    FormularioFinancieroService,
    FormularioFinancieroN1Component,
    FormularioFinancieroAnexo1AComponent,
    FormularioFinancieroAnexo1BComponent,
    FormularioFinancieroAnexo1CComponent,
    FormularioFinancieroAnexo1DComponent,
    FormularioFinancieroRoute,
} from './';
import { FormfinancService, FormfinancDetalleService } from '../entities/index';

const ENTITY_STATES = [
    ...FormularioFinancieroRoute,
];

@NgModule({
    declarations: [
        FormularioFinancieroN1Component,
        FormularioFinancieroAnexo1AComponent,
        FormularioFinancieroAnexo1BComponent,
        FormularioFinancieroAnexo1CComponent,
        FormularioFinancieroAnexo1DComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule,
        DropdownModule,
    ],
    entryComponents: [
        FormularioFinancieroN1Component,
        FormularioFinancieroAnexo1AComponent,
        FormularioFinancieroAnexo1BComponent,
        FormularioFinancieroAnexo1CComponent,
        FormularioFinancieroAnexo1DComponent,
    ],
    providers: [
        FormularioFinancieroService,
        FormfinancService,
        FormfinancDetalleService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioFinancieroModule { }
