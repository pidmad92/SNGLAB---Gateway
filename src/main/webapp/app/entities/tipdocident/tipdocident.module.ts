import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdocidentService,
    TipdocidentPopupService,
    TipdocidentComponent,
    TipdocidentDetailComponent,
    TipdocidentDialogComponent,
    TipdocidentPopupComponent,
    TipdocidentDeletePopupComponent,
    TipdocidentDeleteDialogComponent,
    tipdocidentRoute,
    tipdocidentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdocidentRoute,
    ...tipdocidentPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipdocidentComponent,
        TipdocidentDetailComponent,
        TipdocidentDialogComponent,
        TipdocidentDeleteDialogComponent,
        TipdocidentPopupComponent,
        TipdocidentDeletePopupComponent,
    ],
    entryComponents: [
        TipdocidentComponent,
        TipdocidentDialogComponent,
        TipdocidentPopupComponent,
        TipdocidentDeleteDialogComponent,
        TipdocidentDeletePopupComponent,
    ],
    providers: [
        TipdocidentService,
        TipdocidentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdocidentModule {}
