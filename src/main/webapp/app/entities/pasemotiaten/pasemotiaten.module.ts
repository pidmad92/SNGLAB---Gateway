import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PasemotiatenService,
    PasemotiatenPopupService,
    PasemotiatenComponent,
    PasemotiatenDetailComponent,
    PasemotiatenDialogComponent,
    PasemotiatenPopupComponent,
    PasemotiatenDeletePopupComponent,
    PasemotiatenDeleteDialogComponent,
    pasemotiatenRoute,
    pasemotiatenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pasemotiatenRoute,
    ...pasemotiatenPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PasemotiatenComponent,
        PasemotiatenDetailComponent,
        PasemotiatenDialogComponent,
        PasemotiatenDeleteDialogComponent,
        PasemotiatenPopupComponent,
        PasemotiatenDeletePopupComponent,
    ],
    entryComponents: [
        PasemotiatenComponent,
        PasemotiatenDialogComponent,
        PasemotiatenPopupComponent,
        PasemotiatenDeleteDialogComponent,
        PasemotiatenDeletePopupComponent,
    ],
    providers: [
        PasemotiatenService,
        PasemotiatenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPasemotiatenModule {}
