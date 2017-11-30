import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MultaconciService,
    MultaconciPopupService,
    MultaconciComponent,
    MultaconciDetailComponent,
    MultaconciDialogComponent,
    MultaconciPopupComponent,
    MultaconciDeletePopupComponent,
    MultaconciDeleteDialogComponent,
    multaconciRoute,
    multaconciPopupRoute,
} from './';

const ENTITY_STATES = [
    ...multaconciRoute,
    ...multaconciPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MultaconciComponent,
        MultaconciDetailComponent,
        MultaconciDialogComponent,
        MultaconciDeleteDialogComponent,
        MultaconciPopupComponent,
        MultaconciDeletePopupComponent,
    ],
    entryComponents: [
        MultaconciComponent,
        MultaconciDialogComponent,
        MultaconciPopupComponent,
        MultaconciDeleteDialogComponent,
        MultaconciDeletePopupComponent,
    ],
    providers: [
        MultaconciService,
        MultaconciPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMultaconciModule {}
