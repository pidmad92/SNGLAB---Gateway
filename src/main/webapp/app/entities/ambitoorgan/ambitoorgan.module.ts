import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AmbitoorganService,
    AmbitoorganPopupService,
    AmbitoorganComponent,
    AmbitoorganDetailComponent,
    AmbitoorganDialogComponent,
    AmbitoorganPopupComponent,
    AmbitoorganDeletePopupComponent,
    AmbitoorganDeleteDialogComponent,
    ambitoorganRoute,
    ambitoorganPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ambitoorganRoute,
    ...ambitoorganPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AmbitoorganComponent,
        AmbitoorganDetailComponent,
        AmbitoorganDialogComponent,
        AmbitoorganDeleteDialogComponent,
        AmbitoorganPopupComponent,
        AmbitoorganDeletePopupComponent,
    ],
    entryComponents: [
        AmbitoorganComponent,
        AmbitoorganDialogComponent,
        AmbitoorganPopupComponent,
        AmbitoorganDeleteDialogComponent,
        AmbitoorganDeletePopupComponent,
    ],
    providers: [
        AmbitoorganService,
        AmbitoorganPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAmbitoorganModule {}
