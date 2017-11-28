import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    RegimenlabService,
    RegimenlabPopupService,
    RegimenlabComponent,
    RegimenlabDetailComponent,
    RegimenlabDialogComponent,
    RegimenlabPopupComponent,
    RegimenlabDeletePopupComponent,
    RegimenlabDeleteDialogComponent,
    regimenlabRoute,
    regimenlabPopupRoute,
} from './';

const ENTITY_STATES = [
    ...regimenlabRoute,
    ...regimenlabPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegimenlabComponent,
        RegimenlabDetailComponent,
        RegimenlabDialogComponent,
        RegimenlabDeleteDialogComponent,
        RegimenlabPopupComponent,
        RegimenlabDeletePopupComponent,
    ],
    entryComponents: [
        RegimenlabComponent,
        RegimenlabDialogComponent,
        RegimenlabPopupComponent,
        RegimenlabDeleteDialogComponent,
        RegimenlabDeletePopupComponent,
    ],
    providers: [
        RegimenlabService,
        RegimenlabPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRegimenlabModule {}
