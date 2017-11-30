import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipdocpjService,
    TipdocpjPopupService,
    TipdocpjComponent,
    TipdocpjDetailComponent,
    TipdocpjDialogComponent,
    TipdocpjPopupComponent,
    TipdocpjDeletePopupComponent,
    TipdocpjDeleteDialogComponent,
    tipdocpjRoute,
    tipdocpjPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipdocpjRoute,
    ...tipdocpjPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipdocpjComponent,
        TipdocpjDetailComponent,
        TipdocpjDialogComponent,
        TipdocpjDeleteDialogComponent,
        TipdocpjPopupComponent,
        TipdocpjDeletePopupComponent,
    ],
    entryComponents: [
        TipdocpjComponent,
        TipdocpjDialogComponent,
        TipdocpjPopupComponent,
        TipdocpjDeleteDialogComponent,
        TipdocpjDeletePopupComponent,
    ],
    providers: [
        TipdocpjService,
        TipdocpjPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipdocpjModule {}
