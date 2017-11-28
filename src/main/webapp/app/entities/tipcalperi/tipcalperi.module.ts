import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipcalperiService,
    TipcalperiPopupService,
    TipcalperiComponent,
    TipcalperiDetailComponent,
    TipcalperiDialogComponent,
    TipcalperiPopupComponent,
    TipcalperiDeletePopupComponent,
    TipcalperiDeleteDialogComponent,
    tipcalperiRoute,
    tipcalperiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipcalperiRoute,
    ...tipcalperiPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipcalperiComponent,
        TipcalperiDetailComponent,
        TipcalperiDialogComponent,
        TipcalperiDeleteDialogComponent,
        TipcalperiPopupComponent,
        TipcalperiDeletePopupComponent,
    ],
    entryComponents: [
        TipcalperiComponent,
        TipcalperiDialogComponent,
        TipcalperiPopupComponent,
        TipcalperiDeleteDialogComponent,
        TipcalperiDeletePopupComponent,
    ],
    providers: [
        TipcalperiService,
        TipcalperiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipcalperiModule {}
