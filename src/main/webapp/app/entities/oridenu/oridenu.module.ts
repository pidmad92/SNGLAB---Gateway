import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    OridenuService,
    OridenuPopupService,
    OridenuComponent,
    OridenuDetailComponent,
    OridenuDialogComponent,
    OridenuPopupComponent,
    OridenuDeletePopupComponent,
    OridenuDeleteDialogComponent,
    oridenuRoute,
    oridenuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...oridenuRoute,
    ...oridenuPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OridenuComponent,
        OridenuDetailComponent,
        OridenuDialogComponent,
        OridenuDeleteDialogComponent,
        OridenuPopupComponent,
        OridenuDeletePopupComponent,
    ],
    entryComponents: [
        OridenuComponent,
        OridenuDialogComponent,
        OridenuPopupComponent,
        OridenuDeleteDialogComponent,
        OridenuDeletePopupComponent,
    ],
    providers: [
        OridenuService,
        OridenuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOridenuModule {}
