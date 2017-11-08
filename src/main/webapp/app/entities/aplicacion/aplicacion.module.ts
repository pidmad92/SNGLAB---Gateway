import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AplicacionService,
    AplicacionPopupService,
    AplicacionComponent,
    AplicacionDetailComponent,
    AplicacionDialogComponent,
    AplicacionPopupComponent,
    AplicacionDeletePopupComponent,
    AplicacionDeleteDialogComponent,
    aplicacionRoute,
    aplicacionPopupRoute,
    AplicacionResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...aplicacionRoute,
    ...aplicacionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AplicacionComponent,
        AplicacionDetailComponent,
        AplicacionDialogComponent,
        AplicacionDeleteDialogComponent,
        AplicacionPopupComponent,
        AplicacionDeletePopupComponent,
    ],
    entryComponents: [
        AplicacionComponent,
        AplicacionDialogComponent,
        AplicacionPopupComponent,
        AplicacionDeleteDialogComponent,
        AplicacionDeletePopupComponent,
    ],
    providers: [
        AplicacionService,
        AplicacionPopupService,
        AplicacionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAplicacionModule {}
