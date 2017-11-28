import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ResolutorService,
    ResolutorPopupService,
    ResolutorComponent,
    ResolutorDetailComponent,
    ResolutorDialogComponent,
    ResolutorPopupComponent,
    ResolutorDeletePopupComponent,
    ResolutorDeleteDialogComponent,
    resolutorRoute,
    resolutorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resolutorRoute,
    ...resolutorPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResolutorComponent,
        ResolutorDetailComponent,
        ResolutorDialogComponent,
        ResolutorDeleteDialogComponent,
        ResolutorPopupComponent,
        ResolutorDeletePopupComponent,
    ],
    entryComponents: [
        ResolutorComponent,
        ResolutorDialogComponent,
        ResolutorPopupComponent,
        ResolutorDeleteDialogComponent,
        ResolutorDeletePopupComponent,
    ],
    providers: [
        ResolutorService,
        ResolutorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayResolutorModule {}
