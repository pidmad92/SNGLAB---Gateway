import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    HoraService,
    HoraPopupService,
    HoraComponent,
    HoraDetailComponent,
    HoraDialogComponent,
    HoraPopupComponent,
    HoraDeletePopupComponent,
    HoraDeleteDialogComponent,
    horaRoute,
    horaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...horaRoute,
    ...horaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HoraComponent,
        HoraDetailComponent,
        HoraDialogComponent,
        HoraDeleteDialogComponent,
        HoraPopupComponent,
        HoraDeletePopupComponent,
    ],
    entryComponents: [
        HoraComponent,
        HoraDialogComponent,
        HoraPopupComponent,
        HoraDeleteDialogComponent,
        HoraDeletePopupComponent,
    ],
    providers: [
        HoraService,
        HoraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHoraModule {}
