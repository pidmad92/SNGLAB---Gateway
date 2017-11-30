import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SzonalService,
    SzonalPopupService,
    SzonalComponent,
    SzonalDetailComponent,
    SzonalDialogComponent,
    SzonalPopupComponent,
    SzonalDeletePopupComponent,
    SzonalDeleteDialogComponent,
    szonalRoute,
    szonalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...szonalRoute,
    ...szonalPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SzonalComponent,
        SzonalDetailComponent,
        SzonalDialogComponent,
        SzonalDeleteDialogComponent,
        SzonalPopupComponent,
        SzonalDeletePopupComponent,
    ],
    entryComponents: [
        SzonalComponent,
        SzonalDialogComponent,
        SzonalPopupComponent,
        SzonalDeleteDialogComponent,
        SzonalDeletePopupComponent,
    ],
    providers: [
        SzonalService,
        SzonalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySzonalModule {}
