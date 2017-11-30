import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PasepjService,
    PasepjPopupService,
    PasepjComponent,
    PasepjDetailComponent,
    PasepjDialogComponent,
    PasepjPopupComponent,
    PasepjDeletePopupComponent,
    PasepjDeleteDialogComponent,
    pasepjRoute,
    pasepjPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pasepjRoute,
    ...pasepjPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PasepjComponent,
        PasepjDetailComponent,
        PasepjDialogComponent,
        PasepjDeleteDialogComponent,
        PasepjPopupComponent,
        PasepjDeletePopupComponent,
    ],
    entryComponents: [
        PasepjComponent,
        PasepjDialogComponent,
        PasepjPopupComponent,
        PasepjDeleteDialogComponent,
        PasepjDeletePopupComponent,
    ],
    providers: [
        PasepjService,
        PasepjPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPasepjModule {}
