import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipconremService,
    TipconremPopupService,
    TipconremComponent,
    TipconremDetailComponent,
    TipconremDialogComponent,
    TipconremPopupComponent,
    TipconremDeletePopupComponent,
    TipconremDeleteDialogComponent,
    tipconremRoute,
    tipconremPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipconremRoute,
    ...tipconremPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipconremComponent,
        TipconremDetailComponent,
        TipconremDialogComponent,
        TipconremDeleteDialogComponent,
        TipconremPopupComponent,
        TipconremDeletePopupComponent,
    ],
    entryComponents: [
        TipconremComponent,
        TipconremDialogComponent,
        TipconremPopupComponent,
        TipconremDeleteDialogComponent,
        TipconremDeletePopupComponent,
    ],
    providers: [
        TipconremService,
        TipconremPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipconremModule {}
