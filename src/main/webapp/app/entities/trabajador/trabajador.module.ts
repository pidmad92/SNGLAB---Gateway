import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TrabajadorService,
    TrabajadorPopupService,
    TrabajadorComponent,
    TrabajadorDetailComponent,
    TrabajadorDialogComponent,
    TrabajadorPopupComponent,
    TrabajadorDeletePopupComponent,
    TrabajadorDeleteDialogComponent,
    trabajadorRoute,
    trabajadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...trabajadorRoute,
    ...trabajadorPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TrabajadorComponent,
        TrabajadorDetailComponent,
        TrabajadorDialogComponent,
        TrabajadorDeleteDialogComponent,
        TrabajadorPopupComponent,
        TrabajadorDeletePopupComponent,
    ],
    entryComponents: [
        TrabajadorComponent,
        TrabajadorDialogComponent,
        TrabajadorPopupComponent,
        TrabajadorDeleteDialogComponent,
        TrabajadorDeletePopupComponent,
    ],
    providers: [
        TrabajadorService,
        TrabajadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTrabajadorModule {}
