import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipenvnotService,
    TipenvnotPopupService,
    TipenvnotComponent,
    TipenvnotDetailComponent,
    TipenvnotDialogComponent,
    TipenvnotPopupComponent,
    TipenvnotDeletePopupComponent,
    TipenvnotDeleteDialogComponent,
    tipenvnotRoute,
    tipenvnotPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipenvnotRoute,
    ...tipenvnotPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        TipenvnotComponent,
        TipenvnotDetailComponent,
        TipenvnotDialogComponent,
        TipenvnotDeleteDialogComponent,
        TipenvnotPopupComponent,
        TipenvnotDeletePopupComponent,
    ],
    entryComponents: [
        TipenvnotComponent,
        TipenvnotDialogComponent,
        TipenvnotPopupComponent,
        TipenvnotDeleteDialogComponent,
        TipenvnotDeletePopupComponent,
    ],
    providers: [
        TipenvnotService,
        TipenvnotPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipenvnotModule {}
