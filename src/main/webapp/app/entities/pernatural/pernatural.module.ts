import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PernaturalService,
    PernaturalPopupService,
    PernaturalComponent,
    PernaturalDetailComponent,
    PernaturalDialogComponent,
    PernaturalPopupComponent,
    PernaturalDeletePopupComponent,
    PernaturalDeleteDialogComponent,
    pernaturalRoute,
    pernaturalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pernaturalRoute,
    ...pernaturalPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PernaturalComponent,
        PernaturalDetailComponent,
        PernaturalDialogComponent,
        PernaturalDeleteDialogComponent,
        PernaturalPopupComponent,
        PernaturalDeletePopupComponent,
    ],
    entryComponents: [
        PernaturalComponent,
        PernaturalDialogComponent,
        PernaturalPopupComponent,
        PernaturalDeleteDialogComponent,
        PernaturalDeletePopupComponent,
    ],
    providers: [
        PernaturalService,
        PernaturalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPernaturalModule {}
