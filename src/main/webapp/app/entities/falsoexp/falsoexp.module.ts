import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FalsoexpService,
    FalsoexpPopupService,
    FalsoexpComponent,
    FalsoexpDetailComponent,
    FalsoexpDialogComponent,
    FalsoexpPopupComponent,
    FalsoexpDeletePopupComponent,
    FalsoexpDeleteDialogComponent,
    falsoexpRoute,
    falsoexpPopupRoute,
} from './';

const ENTITY_STATES = [
    ...falsoexpRoute,
    ...falsoexpPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FalsoexpComponent,
        FalsoexpDetailComponent,
        FalsoexpDialogComponent,
        FalsoexpDeleteDialogComponent,
        FalsoexpPopupComponent,
        FalsoexpDeletePopupComponent,
    ],
    entryComponents: [
        FalsoexpComponent,
        FalsoexpDialogComponent,
        FalsoexpPopupComponent,
        FalsoexpDeleteDialogComponent,
        FalsoexpDeletePopupComponent,
    ],
    providers: [
        FalsoexpService,
        FalsoexpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFalsoexpModule {}
