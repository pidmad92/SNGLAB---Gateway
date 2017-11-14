import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EmpleadorService,
    EmpleadorPopupService,
    EmpleadorComponent,
    EmpleadorDetailComponent,
    EmpleadorDialogComponent,
    EmpleadorPopupComponent,
    EmpleadorDeletePopupComponent,
    EmpleadorDeleteDialogComponent,
    empleadorRoute,
    empleadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...empleadorRoute,
    ...empleadorPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        EmpleadorComponent,
        EmpleadorDetailComponent,
        EmpleadorDialogComponent,
        EmpleadorDeleteDialogComponent,
        EmpleadorPopupComponent,
        EmpleadorDeletePopupComponent,
    ],
    entryComponents: [
        EmpleadorComponent,
        EmpleadorDialogComponent,
        EmpleadorPopupComponent,
        EmpleadorDeleteDialogComponent,
        EmpleadorDeletePopupComponent,
    ],
    providers: [
        EmpleadorService,
        EmpleadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEmpleadorModule {}
