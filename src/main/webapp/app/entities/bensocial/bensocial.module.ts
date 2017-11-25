import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    BensocialService,
    BensocialPopupService,
    BensocialComponent,
    BensocialDetailComponent,
    BensocialDialogComponent,
    BensocialPopupComponent,
    BensocialDeletePopupComponent,
    BensocialDeleteDialogComponent,
    bensocialRoute,
    bensocialPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bensocialRoute,
    ...bensocialPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BensocialComponent,
        BensocialDetailComponent,
        BensocialDialogComponent,
        BensocialDeleteDialogComponent,
        BensocialPopupComponent,
        BensocialDeletePopupComponent,
    ],
    entryComponents: [
        BensocialComponent,
        BensocialDialogComponent,
        BensocialPopupComponent,
        BensocialDeleteDialogComponent,
        BensocialDeletePopupComponent,
    ],
    providers: [
        BensocialService,
        BensocialPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayBensocialModule {}
