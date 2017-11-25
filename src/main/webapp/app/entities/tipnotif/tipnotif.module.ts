import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipnotifService,
    TipnotifPopupService,
    TipnotifComponent,
    TipnotifDetailComponent,
    TipnotifDialogComponent,
    TipnotifPopupComponent,
    TipnotifDeletePopupComponent,
    TipnotifDeleteDialogComponent,
    tipnotifRoute,
    tipnotifPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipnotifRoute,
    ...tipnotifPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipnotifComponent,
        TipnotifDetailComponent,
        TipnotifDialogComponent,
        TipnotifDeleteDialogComponent,
        TipnotifPopupComponent,
        TipnotifDeletePopupComponent,
    ],
    entryComponents: [
        TipnotifComponent,
        TipnotifDialogComponent,
        TipnotifPopupComponent,
        TipnotifDeleteDialogComponent,
        TipnotifDeletePopupComponent,
    ],
    providers: [
        TipnotifService,
        TipnotifPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipnotifModule {}
