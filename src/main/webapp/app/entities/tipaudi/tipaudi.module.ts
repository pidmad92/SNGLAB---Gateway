import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipaudiService,
    TipaudiPopupService,
    TipaudiComponent,
    TipaudiDetailComponent,
    TipaudiDialogComponent,
    TipaudiPopupComponent,
    TipaudiDeletePopupComponent,
    TipaudiDeleteDialogComponent,
    tipaudiRoute,
    tipaudiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipaudiRoute,
    ...tipaudiPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipaudiComponent,
        TipaudiDetailComponent,
        TipaudiDialogComponent,
        TipaudiDeleteDialogComponent,
        TipaudiPopupComponent,
        TipaudiDeletePopupComponent,
    ],
    entryComponents: [
        TipaudiComponent,
        TipaudiDialogComponent,
        TipaudiPopupComponent,
        TipaudiDeleteDialogComponent,
        TipaudiDeletePopupComponent,
    ],
    providers: [
        TipaudiService,
        TipaudiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipaudiModule {}
