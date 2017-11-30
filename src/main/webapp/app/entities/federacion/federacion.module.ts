import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FederacionService,
    FederacionPopupService,
    FederacionComponent,
    FederacionDetailComponent,
    FederacionDialogComponent,
    FederacionPopupComponent,
    FederacionDeletePopupComponent,
    FederacionDeleteDialogComponent,
    federacionRoute,
    federacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...federacionRoute,
    ...federacionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FederacionComponent,
        FederacionDetailComponent,
        FederacionDialogComponent,
        FederacionDeleteDialogComponent,
        FederacionPopupComponent,
        FederacionDeletePopupComponent,
    ],
    entryComponents: [
        FederacionComponent,
        FederacionDialogComponent,
        FederacionPopupComponent,
        FederacionDeleteDialogComponent,
        FederacionDeletePopupComponent,
    ],
    providers: [
        FederacionService,
        FederacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFederacionModule {}
