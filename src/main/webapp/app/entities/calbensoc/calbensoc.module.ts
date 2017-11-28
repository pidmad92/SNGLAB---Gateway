import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalbensocService,
    CalbensocPopupService,
    CalbensocComponent,
    CalbensocDetailComponent,
    CalbensocDialogComponent,
    CalbensocPopupComponent,
    CalbensocDeletePopupComponent,
    CalbensocDeleteDialogComponent,
    calbensocRoute,
    calbensocPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calbensocRoute,
    ...calbensocPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CalbensocComponent,
        CalbensocDetailComponent,
        CalbensocDialogComponent,
        CalbensocDeleteDialogComponent,
        CalbensocPopupComponent,
        CalbensocDeletePopupComponent,
    ],
    entryComponents: [
        CalbensocComponent,
        CalbensocDialogComponent,
        CalbensocPopupComponent,
        CalbensocDeleteDialogComponent,
        CalbensocDeletePopupComponent,
    ],
    providers: [
        CalbensocService,
        CalbensocPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalbensocModule {}
