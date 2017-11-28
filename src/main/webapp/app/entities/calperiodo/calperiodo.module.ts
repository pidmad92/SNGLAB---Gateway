import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalperiodoService,
    CalperiodoPopupService,
    CalperiodoComponent,
    CalperiodoDetailComponent,
    CalperiodoDialogComponent,
    CalperiodoPopupComponent,
    CalperiodoDeletePopupComponent,
    CalperiodoDeleteDialogComponent,
    calperiodoRoute,
    calperiodoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calperiodoRoute,
    ...calperiodoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CalperiodoComponent,
        CalperiodoDetailComponent,
        CalperiodoDialogComponent,
        CalperiodoDeleteDialogComponent,
        CalperiodoPopupComponent,
        CalperiodoDeletePopupComponent,
    ],
    entryComponents: [
        CalperiodoComponent,
        CalperiodoDialogComponent,
        CalperiodoPopupComponent,
        CalperiodoDeleteDialogComponent,
        CalperiodoDeletePopupComponent,
    ],
    providers: [
        CalperiodoService,
        CalperiodoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalperiodoModule {}
