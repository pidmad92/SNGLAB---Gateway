import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LibrosindicService,
    LibrosindicPopupService,
    LibrosindicComponent,
    LibrosindicDetailComponent,
    LibrosindicDialogComponent,
    LibrosindicPopupComponent,
    LibrosindicDeletePopupComponent,
    LibrosindicDeleteDialogComponent,
    librosindicRoute,
    librosindicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...librosindicRoute,
    ...librosindicPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LibrosindicComponent,
        LibrosindicDetailComponent,
        LibrosindicDialogComponent,
        LibrosindicDeleteDialogComponent,
        LibrosindicPopupComponent,
        LibrosindicDeletePopupComponent,
    ],
    entryComponents: [
        LibrosindicComponent,
        LibrosindicDialogComponent,
        LibrosindicPopupComponent,
        LibrosindicDeleteDialogComponent,
        LibrosindicDeletePopupComponent,
    ],
    providers: [
        LibrosindicService,
        LibrosindicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLibrosindicModule {}
