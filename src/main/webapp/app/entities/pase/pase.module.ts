import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PaseService,
    PasePopupService,
    PaseComponent,
    PaseDetailComponent,
    PaseDialogComponent,
    PasePopupComponent,
    PaseDeletePopupComponent,
    PaseDeleteDialogComponent,
    paseRoute,
    pasePopupRoute,
} from './';

const ENTITY_STATES = [
    ...paseRoute,
    ...pasePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        PaseComponent,
        PaseDetailComponent,
        PaseDialogComponent,
        PaseDeleteDialogComponent,
        PasePopupComponent,
        PaseDeletePopupComponent,
    ],
    entryComponents: [
        PaseComponent,
        PaseDialogComponent,
        PasePopupComponent,
        PaseDeleteDialogComponent,
        PaseDeletePopupComponent,
    ],
    providers: [
        PaseService,
        PasePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPaseModule {}
