import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FormfinancService,
    FormfinancPopupService,
    FormfinancComponent,
    FormfinancDetailComponent,
    FormfinancDialogComponent,
    FormfinancPopupComponent,
    FormfinancDeletePopupComponent,
    FormfinancDeleteDialogComponent,
    formfinancRoute,
    formfinancPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formfinancRoute,
    ...formfinancPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FormfinancComponent,
        FormfinancDetailComponent,
        FormfinancDialogComponent,
        FormfinancDeleteDialogComponent,
        FormfinancPopupComponent,
        FormfinancDeletePopupComponent,
    ],
    entryComponents: [
        FormfinancComponent,
        FormfinancDialogComponent,
        FormfinancPopupComponent,
        FormfinancDeleteDialogComponent,
        FormfinancDeletePopupComponent,
    ],
    providers: [
        FormfinancService,
        FormfinancPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormfinancModule {}
