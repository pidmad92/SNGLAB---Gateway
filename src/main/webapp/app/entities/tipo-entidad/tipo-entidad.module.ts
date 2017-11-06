import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipoEntidadService,
    TipoEntidadPopupService,
    TipoEntidadComponent,
    TipoEntidadDetailComponent,
    TipoEntidadDialogComponent,
    TipoEntidadPopupComponent,
    TipoEntidadDeletePopupComponent,
    TipoEntidadDeleteDialogComponent,
    tipoEntidadRoute,
    tipoEntidadPopupRoute,
    TipoEntidadResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tipoEntidadRoute,
    ...tipoEntidadPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoEntidadComponent,
        TipoEntidadDetailComponent,
        TipoEntidadDialogComponent,
        TipoEntidadDeleteDialogComponent,
        TipoEntidadPopupComponent,
        TipoEntidadDeletePopupComponent,
    ],
    entryComponents: [
        TipoEntidadComponent,
        TipoEntidadDialogComponent,
        TipoEntidadPopupComponent,
        TipoEntidadDeleteDialogComponent,
        TipoEntidadDeletePopupComponent,
    ],
    providers: [
        TipoEntidadService,
        TipoEntidadPopupService,
        TipoEntidadResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipoEntidadModule {}
