import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModacontratoService,
    ModacontratoPopupService,
    ModacontratoComponent,
    ModacontratoDetailComponent,
    ModacontratoDialogComponent,
    ModacontratoPopupComponent,
    ModacontratoDeletePopupComponent,
    ModacontratoDeleteDialogComponent,
    modacontratoRoute,
    modacontratoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...modacontratoRoute,
    ...modacontratoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModacontratoComponent,
        ModacontratoDetailComponent,
        ModacontratoDialogComponent,
        ModacontratoDeleteDialogComponent,
        ModacontratoPopupComponent,
        ModacontratoDeletePopupComponent,
    ],
    entryComponents: [
        ModacontratoComponent,
        ModacontratoDialogComponent,
        ModacontratoPopupComponent,
        ModacontratoDeleteDialogComponent,
        ModacontratoDeletePopupComponent,
    ],
    providers: [
        ModacontratoService,
        ModacontratoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModacontratoModule {}
