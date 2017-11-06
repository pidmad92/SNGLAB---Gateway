import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModuloEntidadService,
    ModuloEntidadPopupService,
    ModuloEntidadComponent,
    ModuloEntidadDetailComponent,
    ModuloEntidadDialogComponent,
    ModuloEntidadPopupComponent,
    ModuloEntidadDeletePopupComponent,
    ModuloEntidadDeleteDialogComponent,
    moduloEntidadRoute,
    moduloEntidadPopupRoute,
    ModuloEntidadResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...moduloEntidadRoute,
    ...moduloEntidadPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModuloEntidadComponent,
        ModuloEntidadDetailComponent,
        ModuloEntidadDialogComponent,
        ModuloEntidadDeleteDialogComponent,
        ModuloEntidadPopupComponent,
        ModuloEntidadDeletePopupComponent,
    ],
    entryComponents: [
        ModuloEntidadComponent,
        ModuloEntidadDialogComponent,
        ModuloEntidadPopupComponent,
        ModuloEntidadDeleteDialogComponent,
        ModuloEntidadDeletePopupComponent,
    ],
    providers: [
        ModuloEntidadService,
        ModuloEntidadPopupService,
        ModuloEntidadResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModuloEntidadModule {}
