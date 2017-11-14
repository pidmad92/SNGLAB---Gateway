import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DettipprovService,
    DettipprovPopupService,
    DettipprovComponent,
    DettipprovDetailComponent,
    DettipprovDialogComponent,
    DettipprovPopupComponent,
    DettipprovDeletePopupComponent,
    DettipprovDeleteDialogComponent,
    dettipprovRoute,
    dettipprovPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dettipprovRoute,
    ...dettipprovPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        DettipprovComponent,
        DettipprovDetailComponent,
        DettipprovDialogComponent,
        DettipprovDeleteDialogComponent,
        DettipprovPopupComponent,
        DettipprovDeletePopupComponent,
    ],
    entryComponents: [
        DettipprovComponent,
        DettipprovDialogComponent,
        DettipprovPopupComponent,
        DettipprovDeleteDialogComponent,
        DettipprovDeletePopupComponent,
    ],
    providers: [
        DettipprovService,
        DettipprovPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDettipprovModule {}
