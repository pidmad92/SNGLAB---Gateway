import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PerjuridireService,
    PerjuridirePopupService,
    PerjuridireComponent,
    PerjuridireDetailComponent,
    PerjuridireDialogComponent,
    PerjuridirePopupComponent,
    PerjuridireDeletePopupComponent,
    PerjuridireDeleteDialogComponent,
    perjuridireRoute,
    perjuridirePopupRoute,
} from './';

const ENTITY_STATES = [
    ...perjuridireRoute,
    ...perjuridirePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerjuridireComponent,
        PerjuridireDetailComponent,
        PerjuridireDialogComponent,
        PerjuridireDeleteDialogComponent,
        PerjuridirePopupComponent,
        PerjuridireDeletePopupComponent,
    ],
    entryComponents: [
        PerjuridireComponent,
        PerjuridireDialogComponent,
        PerjuridirePopupComponent,
        PerjuridireDeleteDialogComponent,
        PerjuridireDeletePopupComponent,
    ],
    providers: [
        PerjuridireService,
        PerjuridirePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPerjuridireModule {}
