import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipviaService,
    TipviaPopupService,
    TipviaComponent,
    TipviaDetailComponent,
    TipviaDialogComponent,
    TipviaPopupComponent,
    TipviaDeletePopupComponent,
    TipviaDeleteDialogComponent,
    tipviaRoute,
    tipviaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipviaRoute,
    ...tipviaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipviaComponent,
        TipviaDetailComponent,
        TipviaDialogComponent,
        TipviaDeleteDialogComponent,
        TipviaPopupComponent,
        TipviaDeletePopupComponent,
    ],
    entryComponents: [
        TipviaComponent,
        TipviaDialogComponent,
        TipviaPopupComponent,
        TipviaDeleteDialogComponent,
        TipviaDeletePopupComponent,
    ],
    providers: [
        TipviaService,
        TipviaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipviaModule {}
