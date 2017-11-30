import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotivpaseService,
    MotivpasePopupService,
    MotivpaseComponent,
    MotivpaseDetailComponent,
    MotivpaseDialogComponent,
    MotivpasePopupComponent,
    MotivpaseDeletePopupComponent,
    MotivpaseDeleteDialogComponent,
    motivpaseRoute,
    motivpasePopupRoute,
} from './';

const ENTITY_STATES = [
    ...motivpaseRoute,
    ...motivpasePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotivpaseComponent,
        MotivpaseDetailComponent,
        MotivpaseDialogComponent,
        MotivpaseDeleteDialogComponent,
        MotivpasePopupComponent,
        MotivpaseDeletePopupComponent,
    ],
    entryComponents: [
        MotivpaseComponent,
        MotivpaseDialogComponent,
        MotivpasePopupComponent,
        MotivpaseDeleteDialogComponent,
        MotivpaseDeletePopupComponent,
    ],
    providers: [
        MotivpaseService,
        MotivpasePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotivpaseModule {}
