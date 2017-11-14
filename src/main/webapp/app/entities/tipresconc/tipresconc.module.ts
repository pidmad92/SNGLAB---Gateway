import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipresconcService,
    TipresconcPopupService,
    TipresconcComponent,
    TipresconcDetailComponent,
    TipresconcDialogComponent,
    TipresconcPopupComponent,
    TipresconcDeletePopupComponent,
    TipresconcDeleteDialogComponent,
    tipresconcRoute,
    tipresconcPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipresconcRoute,
    ...tipresconcPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        TipresconcComponent,
        TipresconcDetailComponent,
        TipresconcDialogComponent,
        TipresconcDeleteDialogComponent,
        TipresconcPopupComponent,
        TipresconcDeletePopupComponent,
    ],
    entryComponents: [
        TipresconcComponent,
        TipresconcDialogComponent,
        TipresconcPopupComponent,
        TipresconcDeleteDialogComponent,
        TipresconcDeletePopupComponent,
    ],
    providers: [
        TipresconcService,
        TipresconcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipresconcModule {}
