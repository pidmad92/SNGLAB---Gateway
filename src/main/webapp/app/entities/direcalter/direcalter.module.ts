import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DirecalterService,
    DirecalterPopupService,
    DirecalterComponent,
    DirecalterDetailComponent,
    DirecalterDialogComponent,
    DirecalterPopupComponent,
    DirecalterDeletePopupComponent,
    DirecalterDeleteDialogComponent,
    direcalterRoute,
    direcalterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...direcalterRoute,
    ...direcalterPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DirecalterComponent,
        DirecalterDetailComponent,
        DirecalterDialogComponent,
        DirecalterDeleteDialogComponent,
        DirecalterPopupComponent,
        DirecalterDeletePopupComponent,
    ],
    entryComponents: [
        DirecalterComponent,
        DirecalterDialogComponent,
        DirecalterPopupComponent,
        DirecalterDeleteDialogComponent,
        DirecalterDeletePopupComponent,
    ],
    providers: [
        DirecalterService,
        DirecalterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDirecalterModule {}
