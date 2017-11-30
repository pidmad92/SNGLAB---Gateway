import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdiligencService,
    TipdiligencPopupService,
    TipdiligencComponent,
    TipdiligencDetailComponent,
    TipdiligencDialogComponent,
    TipdiligencPopupComponent,
    TipdiligencDeletePopupComponent,
    TipdiligencDeleteDialogComponent,
    tipdiligencRoute,
    tipdiligencPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdiligencRoute,
    ...tipdiligencPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipdiligencComponent,
        TipdiligencDetailComponent,
        TipdiligencDialogComponent,
        TipdiligencDeleteDialogComponent,
        TipdiligencPopupComponent,
        TipdiligencDeletePopupComponent,
    ],
    entryComponents: [
        TipdiligencComponent,
        TipdiligencDialogComponent,
        TipdiligencPopupComponent,
        TipdiligencDeleteDialogComponent,
        TipdiligencDeletePopupComponent,
    ],
    providers: [
        TipdiligencService,
        TipdiligencPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdiligencModule {}
