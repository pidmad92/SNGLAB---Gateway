import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipinteresService,
    TipinteresPopupService,
    TipinteresComponent,
    TipinteresDetailComponent,
    TipinteresDialogComponent,
    TipinteresPopupComponent,
    TipinteresDeletePopupComponent,
    TipinteresDeleteDialogComponent,
    tipinteresRoute,
    tipinteresPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipinteresRoute,
    ...tipinteresPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipinteresComponent,
        TipinteresDetailComponent,
        TipinteresDialogComponent,
        TipinteresDeleteDialogComponent,
        TipinteresPopupComponent,
        TipinteresDeletePopupComponent,
    ],
    entryComponents: [
        TipinteresComponent,
        TipinteresDialogComponent,
        TipinteresPopupComponent,
        TipinteresDeleteDialogComponent,
        TipinteresDeletePopupComponent,
    ],
    providers: [
        TipinteresService,
        TipinteresPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipinteresModule {}
