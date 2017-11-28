import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdocService,
    TipdocPopupService,
    TipdocComponent,
    TipdocDetailComponent,
    TipdocDialogComponent,
    TipdocPopupComponent,
    TipdocDeletePopupComponent,
    TipdocDeleteDialogComponent,
    tipdocRoute,
    tipdocPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdocRoute,
    ...tipdocPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipdocComponent,
        TipdocDetailComponent,
        TipdocDialogComponent,
        TipdocDeleteDialogComponent,
        TipdocPopupComponent,
        TipdocDeletePopupComponent,
    ],
    entryComponents: [
        TipdocComponent,
        TipdocDialogComponent,
        TipdocPopupComponent,
        TipdocDeleteDialogComponent,
        TipdocDeletePopupComponent,
    ],
    providers: [
        TipdocService,
        TipdocPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdocModule {}
