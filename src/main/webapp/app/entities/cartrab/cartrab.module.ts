import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CartrabService,
    CartrabPopupService,
    CartrabComponent,
    CartrabDetailComponent,
    CartrabDialogComponent,
    CartrabPopupComponent,
    CartrabDeletePopupComponent,
    CartrabDeleteDialogComponent,
    cartrabRoute,
    cartrabPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cartrabRoute,
    ...cartrabPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CartrabComponent,
        CartrabDetailComponent,
        CartrabDialogComponent,
        CartrabDeleteDialogComponent,
        CartrabPopupComponent,
        CartrabDeletePopupComponent,
    ],
    entryComponents: [
        CartrabComponent,
        CartrabDialogComponent,
        CartrabPopupComponent,
        CartrabDeleteDialogComponent,
        CartrabDeletePopupComponent,
    ],
    providers: [
        CartrabService,
        CartrabPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCartrabModule {}
