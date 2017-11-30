import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    RespinformaService,
    RespinformaPopupService,
    RespinformaComponent,
    RespinformaDetailComponent,
    RespinformaDialogComponent,
    RespinformaPopupComponent,
    RespinformaDeletePopupComponent,
    RespinformaDeleteDialogComponent,
    respinformaRoute,
    respinformaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...respinformaRoute,
    ...respinformaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RespinformaComponent,
        RespinformaDetailComponent,
        RespinformaDialogComponent,
        RespinformaDeleteDialogComponent,
        RespinformaPopupComponent,
        RespinformaDeletePopupComponent,
    ],
    entryComponents: [
        RespinformaComponent,
        RespinformaDialogComponent,
        RespinformaPopupComponent,
        RespinformaDeleteDialogComponent,
        RespinformaDeletePopupComponent,
    ],
    providers: [
        RespinformaService,
        RespinformaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRespinformaModule {}
