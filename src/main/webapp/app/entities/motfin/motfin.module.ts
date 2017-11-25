import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotfinService,
    MotfinPopupService,
    MotfinComponent,
    MotfinDetailComponent,
    MotfinDialogComponent,
    MotfinPopupComponent,
    MotfinDeletePopupComponent,
    MotfinDeleteDialogComponent,
    motfinRoute,
    motfinPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motfinRoute,
    ...motfinPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MotfinComponent,
        MotfinDetailComponent,
        MotfinDialogComponent,
        MotfinDeleteDialogComponent,
        MotfinPopupComponent,
        MotfinDeletePopupComponent,
    ],
    entryComponents: [
        MotfinComponent,
        MotfinDialogComponent,
        MotfinPopupComponent,
        MotfinDeleteDialogComponent,
        MotfinDeletePopupComponent,
    ],
    providers: [
        MotfinService,
        MotfinPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotfinModule {}
