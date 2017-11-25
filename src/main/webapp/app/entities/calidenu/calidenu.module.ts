import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalidenuService,
    CalidenuPopupService,
    CalidenuComponent,
    CalidenuDetailComponent,
    CalidenuDialogComponent,
    CalidenuPopupComponent,
    CalidenuDeletePopupComponent,
    CalidenuDeleteDialogComponent,
    calidenuRoute,
    calidenuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calidenuRoute,
    ...calidenuPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CalidenuComponent,
        CalidenuDetailComponent,
        CalidenuDialogComponent,
        CalidenuDeleteDialogComponent,
        CalidenuPopupComponent,
        CalidenuDeletePopupComponent,
    ],
    entryComponents: [
        CalidenuComponent,
        CalidenuDialogComponent,
        CalidenuPopupComponent,
        CalidenuDeleteDialogComponent,
        CalidenuDeletePopupComponent,
    ],
    providers: [
        CalidenuService,
        CalidenuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalidenuModule {}
