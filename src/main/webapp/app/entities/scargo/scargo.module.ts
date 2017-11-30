import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ScargoService,
    ScargoPopupService,
    ScargoComponent,
    ScargoDetailComponent,
    ScargoDialogComponent,
    ScargoPopupComponent,
    ScargoDeletePopupComponent,
    ScargoDeleteDialogComponent,
    scargoRoute,
    scargoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scargoRoute,
    ...scargoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ScargoComponent,
        ScargoDetailComponent,
        ScargoDialogComponent,
        ScargoDeleteDialogComponent,
        ScargoPopupComponent,
        ScargoDeletePopupComponent,
    ],
    entryComponents: [
        ScargoComponent,
        ScargoDialogComponent,
        ScargoPopupComponent,
        ScargoDeleteDialogComponent,
        ScargoDeletePopupComponent,
    ],
    providers: [
        ScargoService,
        ScargoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScargoModule {}
