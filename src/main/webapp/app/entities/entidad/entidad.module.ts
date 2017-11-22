import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import { DepartamentoService } from '../../shared/ubigeo/departamento.service';
import { ProvinciaService } from '../../shared/ubigeo/provincia.service';
import { DistritoService } from '../../shared/ubigeo/distrito.service';
import {
    EntidadService,
    EntidadPopupService,
    EntidadComponent,
    EntidadDetailComponent,
    EntidadDialogComponent,
    EntidadPopupComponent,
    EntidadDeletePopupComponent,
    EntidadDeleteDialogComponent,
    entidadRoute,
    entidadPopupRoute,
    EntidadResolvePagingParams,
    EntidadModuloDialogComponent,
    EntidadModuloPopupService,
    EntidadModuloPopupComponent
} from './';
import { ModuloEntidadService } from '../modulo-entidad/index';

const ENTITY_STATES = [
    ...entidadRoute,
    ...entidadPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntidadComponent,
        EntidadDetailComponent,
        EntidadDialogComponent,
        EntidadDeleteDialogComponent,
        EntidadPopupComponent,
        EntidadDeletePopupComponent,
        EntidadModuloDialogComponent,
        EntidadModuloPopupComponent,
    ],
    entryComponents: [
        EntidadComponent,
        EntidadDialogComponent,
        EntidadPopupComponent,
        EntidadDeleteDialogComponent,
        EntidadDeletePopupComponent,
        EntidadModuloDialogComponent,
        EntidadModuloPopupComponent,
    ],
    providers: [
        EntidadService,
        EntidadPopupService,
        EntidadResolvePagingParams,
        EntidadModuloPopupService,
        DepartamentoService,
        ProvinciaService,
        DistritoService,
        ModuloEntidadService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntidadModule {}
