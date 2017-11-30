import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FormarchivoService,
    FormarchivoPopupService,
    FormarchivoComponent,
    FormarchivoDetailComponent,
    FormarchivoDialogComponent,
    FormarchivoPopupComponent,
    FormarchivoDeletePopupComponent,
    FormarchivoDeleteDialogComponent,
    formarchivoRoute,
    formarchivoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formarchivoRoute,
    ...formarchivoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormarchivoComponent,
        FormarchivoDetailComponent,
        FormarchivoDialogComponent,
        FormarchivoDeleteDialogComponent,
        FormarchivoPopupComponent,
        FormarchivoDeletePopupComponent,
    ],
    entryComponents: [
        FormarchivoComponent,
        FormarchivoDialogComponent,
        FormarchivoPopupComponent,
        FormarchivoDeleteDialogComponent,
        FormarchivoDeletePopupComponent,
    ],
    providers: [
        FormarchivoService,
        FormarchivoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormarchivoModule {}
