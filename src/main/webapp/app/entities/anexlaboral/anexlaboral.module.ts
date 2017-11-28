import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AnexlaboralService,
    AnexlaboralPopupService,
    AnexlaboralComponent,
    AnexlaboralDetailComponent,
    AnexlaboralDialogComponent,
    AnexlaboralPopupComponent,
    AnexlaboralDeletePopupComponent,
    AnexlaboralDeleteDialogComponent,
    anexlaboralRoute,
    anexlaboralPopupRoute,
} from './';

const ENTITY_STATES = [
    ...anexlaboralRoute,
    ...anexlaboralPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnexlaboralComponent,
        AnexlaboralDetailComponent,
        AnexlaboralDialogComponent,
        AnexlaboralDeleteDialogComponent,
        AnexlaboralPopupComponent,
        AnexlaboralDeletePopupComponent,
    ],
    entryComponents: [
        AnexlaboralComponent,
        AnexlaboralDialogComponent,
        AnexlaboralPopupComponent,
        AnexlaboralDeleteDialogComponent,
        AnexlaboralDeletePopupComponent,
    ],
    providers: [
        AnexlaboralService,
        AnexlaboralPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAnexlaboralModule {}
