import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SolicformService,
    SolicformPopupService,
    SolicformComponent,
    SolicformDetailComponent,
    SolicformDialogComponent,
    SolicformPopupComponent,
    SolicformDeletePopupComponent,
    SolicformDeleteDialogComponent,
    solicformRoute,
    solicformPopupRoute,
} from './';

const ENTITY_STATES = [
    ...solicformRoute,
    ...solicformPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SolicformComponent,
        SolicformDetailComponent,
        SolicformDialogComponent,
        SolicformDeleteDialogComponent,
        SolicformPopupComponent,
        SolicformDeletePopupComponent,
    ],
    entryComponents: [
        SolicformComponent,
        SolicformDialogComponent,
        SolicformPopupComponent,
        SolicformDeleteDialogComponent,
        SolicformDeletePopupComponent,
    ],
    providers: [
        SolicformService,
        SolicformPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySolicformModule {}
