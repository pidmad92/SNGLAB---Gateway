import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipolibroService,
    TipolibroPopupService,
    TipolibroComponent,
    TipolibroDetailComponent,
    TipolibroDialogComponent,
    TipolibroPopupComponent,
    TipolibroDeletePopupComponent,
    TipolibroDeleteDialogComponent,
    tipolibroRoute,
    tipolibroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipolibroRoute,
    ...tipolibroPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipolibroComponent,
        TipolibroDetailComponent,
        TipolibroDialogComponent,
        TipolibroDeleteDialogComponent,
        TipolibroPopupComponent,
        TipolibroDeletePopupComponent,
    ],
    entryComponents: [
        TipolibroComponent,
        TipolibroDialogComponent,
        TipolibroPopupComponent,
        TipolibroDeleteDialogComponent,
        TipolibroDeletePopupComponent,
    ],
    providers: [
        TipolibroService,
        TipolibroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipolibroModule {}
