import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipoorganizService,
    TipoorganizPopupService,
    TipoorganizComponent,
    TipoorganizDetailComponent,
    TipoorganizDialogComponent,
    TipoorganizPopupComponent,
    TipoorganizDeletePopupComponent,
    TipoorganizDeleteDialogComponent,
    tipoorganizRoute,
    tipoorganizPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoorganizRoute,
    ...tipoorganizPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoorganizComponent,
        TipoorganizDetailComponent,
        TipoorganizDialogComponent,
        TipoorganizDeleteDialogComponent,
        TipoorganizPopupComponent,
        TipoorganizDeletePopupComponent,
    ],
    entryComponents: [
        TipoorganizComponent,
        TipoorganizDialogComponent,
        TipoorganizPopupComponent,
        TipoorganizDeleteDialogComponent,
        TipoorganizDeletePopupComponent,
    ],
    providers: [
        TipoorganizService,
        TipoorganizPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipoorganizModule {}
