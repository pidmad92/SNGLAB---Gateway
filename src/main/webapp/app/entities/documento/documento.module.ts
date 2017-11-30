import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocumentoService,
    DocumentoPopupService,
    DocumentoComponent,
    DocumentoDetailComponent,
    DocumentoDialogComponent,
    DocumentoPopupComponent,
    DocumentoDeletePopupComponent,
    DocumentoDeleteDialogComponent,
    documentoRoute,
    documentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentoRoute,
    ...documentoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentoComponent,
        DocumentoDetailComponent,
        DocumentoDialogComponent,
        DocumentoDeleteDialogComponent,
        DocumentoPopupComponent,
        DocumentoDeletePopupComponent,
    ],
    entryComponents: [
        DocumentoComponent,
        DocumentoDialogComponent,
        DocumentoPopupComponent,
        DocumentoDeleteDialogComponent,
        DocumentoDeletePopupComponent,
    ],
    providers: [
        DocumentoService,
        DocumentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocumentoModule {}
