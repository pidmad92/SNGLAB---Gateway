import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipvinculoService,
    TipvinculoPopupService,
    TipvinculoComponent,
    TipvinculoDetailComponent,
    TipvinculoDialogComponent,
    TipvinculoPopupComponent,
    TipvinculoDeletePopupComponent,
    TipvinculoDeleteDialogComponent,
    tipvinculoRoute,
    tipvinculoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipvinculoRoute,
    ...tipvinculoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipvinculoComponent,
        TipvinculoDetailComponent,
        TipvinculoDialogComponent,
        TipvinculoDeleteDialogComponent,
        TipvinculoPopupComponent,
        TipvinculoDeletePopupComponent,
    ],
    entryComponents: [
        TipvinculoComponent,
        TipvinculoDialogComponent,
        TipvinculoPopupComponent,
        TipvinculoDeleteDialogComponent,
        TipvinculoDeletePopupComponent,
    ],
    providers: [
        TipvinculoService,
        TipvinculoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipvinculoModule {}
