import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SrubroService,
    SrubroPopupService,
    SrubroComponent,
    SrubroDetailComponent,
    SrubroDialogComponent,
    SrubroPopupComponent,
    SrubroDeletePopupComponent,
    SrubroDeleteDialogComponent,
    srubroRoute,
    srubroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...srubroRoute,
    ...srubroPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SrubroComponent,
        SrubroDetailComponent,
        SrubroDialogComponent,
        SrubroDeleteDialogComponent,
        SrubroPopupComponent,
        SrubroDeletePopupComponent,
    ],
    entryComponents: [
        SrubroComponent,
        SrubroDialogComponent,
        SrubroPopupComponent,
        SrubroDeleteDialogComponent,
        SrubroDeletePopupComponent,
    ],
    providers: [
        SrubroService,
        SrubroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySrubroModule {}
