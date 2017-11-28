import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DetmotdenService,
    DetmotdenPopupService,
    DetmotdenComponent,
    DetmotdenDetailComponent,
    DetmotdenDialogComponent,
    DetmotdenPopupComponent,
    DetmotdenDeletePopupComponent,
    DetmotdenDeleteDialogComponent,
    detmotdenRoute,
    detmotdenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...detmotdenRoute,
    ...detmotdenPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DetmotdenComponent,
        DetmotdenDetailComponent,
        DetmotdenDialogComponent,
        DetmotdenDeleteDialogComponent,
        DetmotdenPopupComponent,
        DetmotdenDeletePopupComponent,
    ],
    entryComponents: [
        DetmotdenComponent,
        DetmotdenDialogComponent,
        DetmotdenPopupComponent,
        DetmotdenDeleteDialogComponent,
        DetmotdenDeletePopupComponent,
    ],
    providers: [
        DetmotdenService,
        DetmotdenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDetmotdenModule {}
