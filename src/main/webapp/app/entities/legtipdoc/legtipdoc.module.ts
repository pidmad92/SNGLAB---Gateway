import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LegtipdocService,
    LegtipdocPopupService,
    LegtipdocComponent,
    LegtipdocDetailComponent,
    LegtipdocDialogComponent,
    LegtipdocPopupComponent,
    LegtipdocDeletePopupComponent,
    LegtipdocDeleteDialogComponent,
    legtipdocRoute,
    legtipdocPopupRoute,
} from './';

const ENTITY_STATES = [
    ...legtipdocRoute,
    ...legtipdocPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LegtipdocComponent,
        LegtipdocDetailComponent,
        LegtipdocDialogComponent,
        LegtipdocDeleteDialogComponent,
        LegtipdocPopupComponent,
        LegtipdocDeletePopupComponent,
    ],
    entryComponents: [
        LegtipdocComponent,
        LegtipdocDialogComponent,
        LegtipdocPopupComponent,
        LegtipdocDeleteDialogComponent,
        LegtipdocDeletePopupComponent,
    ],
    providers: [
        LegtipdocService,
        LegtipdocPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLegtipdocModule {}
