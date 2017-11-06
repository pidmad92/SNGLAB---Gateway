import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipatencionService,
    TipatencionPopupService,
    TipatencionComponent,
    TipatencionDetailComponent,
    TipatencionDialogComponent,
    TipatencionPopupComponent,
    TipatencionDeletePopupComponent,
    TipatencionDeleteDialogComponent,
    tipatencionRoute,
    tipatencionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipatencionRoute,
    ...tipatencionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipatencionComponent,
        TipatencionDetailComponent,
        TipatencionDialogComponent,
        TipatencionDeleteDialogComponent,
        TipatencionPopupComponent,
        TipatencionDeletePopupComponent,
    ],
    entryComponents: [
        TipatencionComponent,
        TipatencionDialogComponent,
        TipatencionPopupComponent,
        TipatencionDeleteDialogComponent,
        TipatencionDeletePopupComponent,
    ],
    providers: [
        TipatencionService,
        TipatencionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipatencionModule {}
