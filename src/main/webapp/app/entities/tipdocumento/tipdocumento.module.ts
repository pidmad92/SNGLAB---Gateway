import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdocumentoService,
    TipdocumentoPopupService,
    TipdocumentoComponent,
    TipdocumentoDetailComponent,
    TipdocumentoDialogComponent,
    TipdocumentoPopupComponent,
    TipdocumentoDeletePopupComponent,
    TipdocumentoDeleteDialogComponent,
    tipdocumentoRoute,
    tipdocumentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdocumentoRoute,
    ...tipdocumentoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipdocumentoComponent,
        TipdocumentoDetailComponent,
        TipdocumentoDialogComponent,
        TipdocumentoDeleteDialogComponent,
        TipdocumentoPopupComponent,
        TipdocumentoDeletePopupComponent,
    ],
    entryComponents: [
        TipdocumentoComponent,
        TipdocumentoDialogComponent,
        TipdocumentoPopupComponent,
        TipdocumentoDeleteDialogComponent,
        TipdocumentoDeletePopupComponent,
    ],
    providers: [
        TipdocumentoService,
        TipdocumentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdocumentoModule {}
