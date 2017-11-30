import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    LiquidacionService,
    LiquidacionPopupService,
    LiquidacionComponent,
    LiquidacionDetailComponent,
    LiquidacionDialogComponent,
    LiquidacionPopupComponent,
    LiquidacionDeletePopupComponent,
    LiquidacionDeleteDialogComponent,
    liquidacionRoute,
    liquidacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...liquidacionRoute,
    ...liquidacionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LiquidacionComponent,
        LiquidacionDetailComponent,
        LiquidacionDialogComponent,
        LiquidacionDeleteDialogComponent,
        LiquidacionPopupComponent,
        LiquidacionDeletePopupComponent,
    ],
    entryComponents: [
        LiquidacionComponent,
        LiquidacionDialogComponent,
        LiquidacionPopupComponent,
        LiquidacionDeleteDialogComponent,
        LiquidacionDeletePopupComponent,
    ],
    providers: [
        LiquidacionService,
        LiquidacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLiquidacionModule {}
