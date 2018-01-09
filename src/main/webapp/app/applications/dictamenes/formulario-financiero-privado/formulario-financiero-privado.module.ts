import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { DialogModule, TabMenuModule, MenuItem, DropdownModule } from 'primeng/primeng';

import {
    FormularioFinancieroPrivadoService,
    FormularioFinancieroPrivadoN1Component,
    FormularioFinancieroPrivadoAnexo1AComponent,
    FormularioFinancieroPrivadoAnexo1BComponent,
    FormularioFinancieroPrivadoAnexo1CComponent,
    FormularioFinancieroPrivadoAnexo1DComponent,
    FormularioFinancieroPrivadoRoute,
} from './';
import { FormfinancService, FormfinancDetalleService } from '../entities/index';

const ENTITY_STATES = [
    ...FormularioFinancieroPrivadoRoute,
];

@NgModule({
    declarations: [
        FormularioFinancieroPrivadoN1Component,
        FormularioFinancieroPrivadoAnexo1AComponent,
        FormularioFinancieroPrivadoAnexo1BComponent,
        FormularioFinancieroPrivadoAnexo1CComponent,
        FormularioFinancieroPrivadoAnexo1DComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
        TabMenuModule,
        DropdownModule,
    ],
    entryComponents: [
        FormularioFinancieroPrivadoN1Component,
        FormularioFinancieroPrivadoAnexo1AComponent,
        FormularioFinancieroPrivadoAnexo1BComponent,
        FormularioFinancieroPrivadoAnexo1CComponent,
        FormularioFinancieroPrivadoAnexo1DComponent,
    ],
    providers: [
        FormularioFinancieroPrivadoService,
        FormfinancService,
        FormfinancDetalleService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormularioFinancieroPrivadoModule { }
