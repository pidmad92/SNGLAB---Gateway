import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LegajoService,
    LegajoPopupService,
    LegajoComponent,
    LegajoDetailComponent,
    LegajoDialogComponent,
    LegajoPopupComponent,
    LegajoDeletePopupComponent,
    LegajoDeleteDialogComponent,
    legajoRoute,
    legajoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...legajoRoute,
    ...legajoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LegajoComponent,
        LegajoDetailComponent,
        LegajoDialogComponent,
        LegajoDeleteDialogComponent,
        LegajoPopupComponent,
        LegajoDeletePopupComponent,
    ],
    entryComponents: [
        LegajoComponent,
        LegajoDialogComponent,
        LegajoPopupComponent,
        LegajoDeleteDialogComponent,
        LegajoDeletePopupComponent,
    ],
    providers: [
        LegajoService,
        LegajoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLegajoModule {}
