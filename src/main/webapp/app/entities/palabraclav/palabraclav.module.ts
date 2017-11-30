import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PalabraclavService,
    PalabraclavPopupService,
    PalabraclavComponent,
    PalabraclavDetailComponent,
    PalabraclavDialogComponent,
    PalabraclavPopupComponent,
    PalabraclavDeletePopupComponent,
    PalabraclavDeleteDialogComponent,
    palabraclavRoute,
    palabraclavPopupRoute,
} from './';

const ENTITY_STATES = [
    ...palabraclavRoute,
    ...palabraclavPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PalabraclavComponent,
        PalabraclavDetailComponent,
        PalabraclavDialogComponent,
        PalabraclavDeleteDialogComponent,
        PalabraclavPopupComponent,
        PalabraclavDeletePopupComponent,
    ],
    entryComponents: [
        PalabraclavComponent,
        PalabraclavDialogComponent,
        PalabraclavPopupComponent,
        PalabraclavDeleteDialogComponent,
        PalabraclavDeletePopupComponent,
    ],
    providers: [
        PalabraclavService,
        PalabraclavPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPalabraclavModule {}
