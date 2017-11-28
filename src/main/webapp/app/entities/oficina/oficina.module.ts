import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    OficinaService,
    OficinaPopupService,
    OficinaComponent,
    OficinaDetailComponent,
    OficinaDialogComponent,
    OficinaPopupComponent,
    OficinaDeletePopupComponent,
    OficinaDeleteDialogComponent,
    oficinaRoute,
    oficinaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...oficinaRoute,
    ...oficinaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OficinaComponent,
        OficinaDetailComponent,
        OficinaDialogComponent,
        OficinaDeleteDialogComponent,
        OficinaPopupComponent,
        OficinaDeletePopupComponent,
    ],
    entryComponents: [
        OficinaComponent,
        OficinaDialogComponent,
        OficinaPopupComponent,
        OficinaDeleteDialogComponent,
        OficinaDeletePopupComponent,
    ],
    providers: [
        OficinaService,
        OficinaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOficinaModule {}
