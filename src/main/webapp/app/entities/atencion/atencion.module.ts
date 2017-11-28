import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AtencionService,
    AtencionPopupService,
    AtencionComponent,
    AtencionDetailComponent,
    AtencionDialogComponent,
    AtencionPopupComponent,
    AtencionDeletePopupComponent,
    AtencionDeleteDialogComponent,
    atencionRoute,
    atencionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atencionRoute,
    ...atencionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionComponent,
        AtencionDetailComponent,
        AtencionDialogComponent,
        AtencionDeleteDialogComponent,
        AtencionPopupComponent,
        AtencionDeletePopupComponent,
    ],
    entryComponents: [
        AtencionComponent,
        AtencionDialogComponent,
        AtencionPopupComponent,
        AtencionDeleteDialogComponent,
        AtencionDeletePopupComponent,
    ],
    providers: [
        AtencionService,
        AtencionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAtencionModule {}
