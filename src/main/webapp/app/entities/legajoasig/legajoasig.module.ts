import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LegajoasigService,
    LegajoasigPopupService,
    LegajoasigComponent,
    LegajoasigDetailComponent,
    LegajoasigDialogComponent,
    LegajoasigPopupComponent,
    LegajoasigDeletePopupComponent,
    LegajoasigDeleteDialogComponent,
    legajoasigRoute,
    legajoasigPopupRoute,
} from './';

const ENTITY_STATES = [
    ...legajoasigRoute,
    ...legajoasigPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LegajoasigComponent,
        LegajoasigDetailComponent,
        LegajoasigDialogComponent,
        LegajoasigDeleteDialogComponent,
        LegajoasigPopupComponent,
        LegajoasigDeletePopupComponent,
    ],
    entryComponents: [
        LegajoasigComponent,
        LegajoasigDialogComponent,
        LegajoasigPopupComponent,
        LegajoasigDeleteDialogComponent,
        LegajoasigDeletePopupComponent,
    ],
    providers: [
        LegajoasigService,
        LegajoasigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLegajoasigModule {}
