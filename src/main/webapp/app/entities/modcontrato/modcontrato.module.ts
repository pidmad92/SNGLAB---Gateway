import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModcontratoService,
    ModcontratoPopupService,
    ModcontratoComponent,
    ModcontratoDetailComponent,
    ModcontratoDialogComponent,
    ModcontratoPopupComponent,
    ModcontratoDeletePopupComponent,
    ModcontratoDeleteDialogComponent,
    modcontratoRoute,
    modcontratoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...modcontratoRoute,
    ...modcontratoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModcontratoComponent,
        ModcontratoDetailComponent,
        ModcontratoDialogComponent,
        ModcontratoDeleteDialogComponent,
        ModcontratoPopupComponent,
        ModcontratoDeletePopupComponent,
    ],
    entryComponents: [
        ModcontratoComponent,
        ModcontratoDialogComponent,
        ModcontratoPopupComponent,
        ModcontratoDeleteDialogComponent,
        ModcontratoDeletePopupComponent,
    ],
    providers: [
        ModcontratoService,
        ModcontratoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModcontratoModule {}
