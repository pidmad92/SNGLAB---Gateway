import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdocexpService,
    TipdocexpPopupService,
    TipdocexpComponent,
    TipdocexpDetailComponent,
    TipdocexpDialogComponent,
    TipdocexpPopupComponent,
    TipdocexpDeletePopupComponent,
    TipdocexpDeleteDialogComponent,
    tipdocexpRoute,
    tipdocexpPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdocexpRoute,
    ...tipdocexpPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipdocexpComponent,
        TipdocexpDetailComponent,
        TipdocexpDialogComponent,
        TipdocexpDeleteDialogComponent,
        TipdocexpPopupComponent,
        TipdocexpDeletePopupComponent,
    ],
    entryComponents: [
        TipdocexpComponent,
        TipdocexpDialogComponent,
        TipdocexpPopupComponent,
        TipdocexpDeleteDialogComponent,
        TipdocexpDeletePopupComponent,
    ],
    providers: [
        TipdocexpService,
        TipdocexpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdocexpModule {}
