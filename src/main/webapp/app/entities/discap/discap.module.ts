import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DiscapService,
    DiscapPopupService,
    DiscapComponent,
    DiscapDetailComponent,
    DiscapDialogComponent,
    DiscapPopupComponent,
    DiscapDeletePopupComponent,
    DiscapDeleteDialogComponent,
    discapRoute,
    discapPopupRoute,
} from './';

const ENTITY_STATES = [
    ...discapRoute,
    ...discapPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscapComponent,
        DiscapDetailComponent,
        DiscapDialogComponent,
        DiscapDeleteDialogComponent,
        DiscapPopupComponent,
        DiscapDeletePopupComponent,
    ],
    entryComponents: [
        DiscapComponent,
        DiscapDialogComponent,
        DiscapPopupComponent,
        DiscapDeleteDialogComponent,
        DiscapDeletePopupComponent,
    ],
    providers: [
        DiscapService,
        DiscapPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDiscapModule {}
