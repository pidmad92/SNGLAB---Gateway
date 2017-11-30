import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TiporecursoService,
    TiporecursoPopupService,
    TiporecursoComponent,
    TiporecursoDetailComponent,
    TiporecursoDialogComponent,
    TiporecursoPopupComponent,
    TiporecursoDeletePopupComponent,
    TiporecursoDeleteDialogComponent,
    tiporecursoRoute,
    tiporecursoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tiporecursoRoute,
    ...tiporecursoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TiporecursoComponent,
        TiporecursoDetailComponent,
        TiporecursoDialogComponent,
        TiporecursoDeleteDialogComponent,
        TiporecursoPopupComponent,
        TiporecursoDeletePopupComponent,
    ],
    entryComponents: [
        TiporecursoComponent,
        TiporecursoDialogComponent,
        TiporecursoPopupComponent,
        TiporecursoDeleteDialogComponent,
        TiporecursoDeletePopupComponent,
    ],
    providers: [
        TiporecursoService,
        TiporecursoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTiporecursoModule {}
