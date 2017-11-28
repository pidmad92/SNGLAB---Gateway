import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DirecnotifService,
    DirecnotifPopupService,
    DirecnotifComponent,
    DirecnotifDetailComponent,
    DirecnotifDialogComponent,
    DirecnotifPopupComponent,
    DirecnotifDeletePopupComponent,
    DirecnotifDeleteDialogComponent,
    direcnotifRoute,
    direcnotifPopupRoute,
} from './';

const ENTITY_STATES = [
    ...direcnotifRoute,
    ...direcnotifPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DirecnotifComponent,
        DirecnotifDetailComponent,
        DirecnotifDialogComponent,
        DirecnotifDeleteDialogComponent,
        DirecnotifPopupComponent,
        DirecnotifDeletePopupComponent,
    ],
    entryComponents: [
        DirecnotifComponent,
        DirecnotifDialogComponent,
        DirecnotifPopupComponent,
        DirecnotifDeleteDialogComponent,
        DirecnotifDeletePopupComponent,
    ],
    providers: [
        DirecnotifService,
        DirecnotifPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDirecnotifModule {}
