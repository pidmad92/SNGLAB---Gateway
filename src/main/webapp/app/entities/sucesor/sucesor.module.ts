import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SucesorService,
    SucesorPopupService,
    SucesorComponent,
    SucesorDetailComponent,
    SucesorDialogComponent,
    SucesorPopupComponent,
    SucesorDeletePopupComponent,
    SucesorDeleteDialogComponent,
    sucesorRoute,
    sucesorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sucesorRoute,
    ...sucesorPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SucesorComponent,
        SucesorDetailComponent,
        SucesorDialogComponent,
        SucesorDeleteDialogComponent,
        SucesorPopupComponent,
        SucesorDeletePopupComponent,
    ],
    entryComponents: [
        SucesorComponent,
        SucesorDialogComponent,
        SucesorPopupComponent,
        SucesorDeleteDialogComponent,
        SucesorDeletePopupComponent,
    ],
    providers: [
        SucesorService,
        SucesorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySucesorModule {}
