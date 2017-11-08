import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PersonajuridService,
    PersonajuridPopupService,
    PersonajuridComponent,
    PersonajuridDetailComponent,
    PersonajuridDialogComponent,
    PersonajuridPopupComponent,
    PersonajuridDeletePopupComponent,
    PersonajuridDeleteDialogComponent,
    personajuridRoute,
    personajuridPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personajuridRoute,
    ...personajuridPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonajuridComponent,
        PersonajuridDetailComponent,
        PersonajuridDialogComponent,
        PersonajuridDeleteDialogComponent,
        PersonajuridPopupComponent,
        PersonajuridDeletePopupComponent,
    ],
    entryComponents: [
        PersonajuridComponent,
        PersonajuridDialogComponent,
        PersonajuridPopupComponent,
        PersonajuridDeleteDialogComponent,
        PersonajuridDeletePopupComponent,
    ],
    providers: [
        PersonajuridService,
        PersonajuridPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPersonajuridModule {}
