import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    RegimenlaboService,
    RegimenlaboPopupService,
    RegimenlaboComponent,
    RegimenlaboDetailComponent,
    RegimenlaboDialogComponent,
    RegimenlaboPopupComponent,
    RegimenlaboDeletePopupComponent,
    RegimenlaboDeleteDialogComponent,
    regimenlaboRoute,
    regimenlaboPopupRoute,
} from './';

const ENTITY_STATES = [
    ...regimenlaboRoute,
    ...regimenlaboPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegimenlaboComponent,
        RegimenlaboDetailComponent,
        RegimenlaboDialogComponent,
        RegimenlaboDeleteDialogComponent,
        RegimenlaboPopupComponent,
        RegimenlaboDeletePopupComponent,
    ],
    entryComponents: [
        RegimenlaboComponent,
        RegimenlaboDialogComponent,
        RegimenlaboPopupComponent,
        RegimenlaboDeleteDialogComponent,
        RegimenlaboDeletePopupComponent,
    ],
    providers: [
        RegimenlaboService,
        RegimenlaboPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRegimenlaboModule {}
