import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AccionadopService,
    AccionadopPopupService,
    AccionadopComponent,
    AccionadopDetailComponent,
    AccionadopDialogComponent,
    AccionadopPopupComponent,
    AccionadopDeletePopupComponent,
    AccionadopDeleteDialogComponent,
    accionadopRoute,
    accionadopPopupRoute,
} from './';

const ENTITY_STATES = [
    ...accionadopRoute,
    ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AccionadopComponent,
        AccionadopDetailComponent,
        AccionadopDialogComponent,
        AccionadopDeleteDialogComponent,
        AccionadopPopupComponent,
        AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AccionadopComponent,
        AccionadopDialogComponent,
        AccionadopPopupComponent,
        AccionadopDeleteDialogComponent,
        AccionadopDeletePopupComponent,
    ],
    providers: [
        AccionadopService,
        AccionadopPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAccionadopModule {}
