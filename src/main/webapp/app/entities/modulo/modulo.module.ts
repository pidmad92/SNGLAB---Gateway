import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModuloService,
    ModuloPopupService,
    ModuloComponent,
    ModuloDetailComponent,
    ModuloDialogComponent,
    ModuloPopupComponent,
    ModuloDeletePopupComponent,
    ModuloDeleteDialogComponent,
    moduloRoute,
    moduloPopupRoute,
    ModuloResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...moduloRoute,
    ...moduloPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModuloComponent,
        ModuloDetailComponent,
        ModuloDialogComponent,
        ModuloDeleteDialogComponent,
        ModuloPopupComponent,
        ModuloDeletePopupComponent,
    ],
    entryComponents: [
        ModuloComponent,
        ModuloDialogComponent,
        ModuloPopupComponent,
        ModuloDeleteDialogComponent,
        ModuloDeletePopupComponent,
    ],
    providers: [
        ModuloService,
        ModuloPopupService,
        ModuloResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModuloModule {}
