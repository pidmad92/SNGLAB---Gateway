import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotivoatenciService,
    MotivoatenciPopupService,
    MotivoatenciComponent,
    MotivoatenciDetailComponent,
    MotivoatenciDialogComponent,
    MotivoatenciPopupComponent,
    MotivoatenciDeletePopupComponent,
    MotivoatenciDeleteDialogComponent,
    motivoatenciRoute,
    motivoatenciPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motivoatenciRoute,
    ...motivoatenciPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotivoatenciComponent,
        MotivoatenciDetailComponent,
        MotivoatenciDialogComponent,
        MotivoatenciDeleteDialogComponent,
        MotivoatenciPopupComponent,
        MotivoatenciDeletePopupComponent,
    ],
    entryComponents: [
        MotivoatenciComponent,
        MotivoatenciDialogComponent,
        MotivoatenciPopupComponent,
        MotivoatenciDeleteDialogComponent,
        MotivoatenciDeletePopupComponent,
    ],
    providers: [
        MotivoatenciService,
        MotivoatenciPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotivoatenciModule {}
