import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DireccionService,
    DireccionPopupService,
    DireccionComponent,
    DireccionDetailComponent,
    DireccionDialogComponent,
    DireccionPopupComponent,
    DireccionDeletePopupComponent,
    DireccionDeleteDialogComponent,
    direccionRoute,
    direccionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...direccionRoute,
    ...direccionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DireccionComponent,
        DireccionDetailComponent,
        DireccionDialogComponent,
        DireccionDeleteDialogComponent,
        DireccionPopupComponent,
        DireccionDeletePopupComponent,
    ],
    entryComponents: [
        DireccionComponent,
        DireccionDialogComponent,
        DireccionPopupComponent,
        DireccionDeleteDialogComponent,
        DireccionDeletePopupComponent,
    ],
    providers: [
        DireccionService,
        DireccionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDireccionModule {}
