import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PaseglService,
    PaseglPopupService,
    PaseglComponent,
    PaseglDetailComponent,
    PaseglDialogComponent,
    PaseglPopupComponent,
    PaseglDeletePopupComponent,
    PaseglDeleteDialogComponent,
    paseglRoute,
    paseglPopupRoute,
} from './';

const ENTITY_STATES = [
    ...paseglRoute,
    ...paseglPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaseglComponent,
        PaseglDetailComponent,
        PaseglDialogComponent,
        PaseglDeleteDialogComponent,
        PaseglPopupComponent,
        PaseglDeletePopupComponent,
    ],
    entryComponents: [
        PaseglComponent,
        PaseglDialogComponent,
        PaseglPopupComponent,
        PaseglDeleteDialogComponent,
        PaseglDeletePopupComponent,
    ],
    providers: [
        PaseglService,
        PaseglPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPaseglModule {}
