import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipzonaService,
    TipzonaPopupService,
    TipzonaComponent,
    TipzonaDetailComponent,
    TipzonaDialogComponent,
    TipzonaPopupComponent,
    TipzonaDeletePopupComponent,
    TipzonaDeleteDialogComponent,
    tipzonaRoute,
    tipzonaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipzonaRoute,
    ...tipzonaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipzonaComponent,
        TipzonaDetailComponent,
        TipzonaDialogComponent,
        TipzonaDeleteDialogComponent,
        TipzonaPopupComponent,
        TipzonaDeletePopupComponent,
    ],
    entryComponents: [
        TipzonaComponent,
        TipzonaDialogComponent,
        TipzonaPopupComponent,
        TipzonaDeleteDialogComponent,
        TipzonaDeletePopupComponent,
    ],
    providers: [
        TipzonaService,
        TipzonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipzonaModule {}
