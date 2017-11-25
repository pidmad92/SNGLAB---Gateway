import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotateselecService,
    MotateselecPopupService,
    MotateselecComponent,
    MotateselecDetailComponent,
    MotateselecDialogComponent,
    MotateselecPopupComponent,
    MotateselecDeletePopupComponent,
    MotateselecDeleteDialogComponent,
    motateselecRoute,
    motateselecPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motateselecRoute,
    ...motateselecPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MotateselecComponent,
        MotateselecDetailComponent,
        MotateselecDialogComponent,
        MotateselecDeleteDialogComponent,
        MotateselecPopupComponent,
        MotateselecDeletePopupComponent,
    ],
    entryComponents: [
        MotateselecComponent,
        MotateselecDialogComponent,
        MotateselecPopupComponent,
        MotateselecDeleteDialogComponent,
        MotateselecDeletePopupComponent,
    ],
    providers: [
        MotateselecService,
        MotateselecPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotateselecModule {}
