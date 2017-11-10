import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DatlaboralService,
    DatlaboralPopupService,
    DatlaboralComponent,
    DatlaboralDetailComponent,
    DatlaboralDialogComponent,
    DatlaboralPopupComponent,
    DatlaboralDeletePopupComponent,
    DatlaboralDeleteDialogComponent,
    datlaboralRoute,
    datlaboralPopupRoute,
} from './';

const ENTITY_STATES = [
    ...datlaboralRoute,
    ...datlaboralPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatlaboralComponent,
        DatlaboralDetailComponent,
        DatlaboralDialogComponent,
        DatlaboralDeleteDialogComponent,
        DatlaboralPopupComponent,
        DatlaboralDeletePopupComponent,
    ],
    entryComponents: [
        DatlaboralComponent,
        DatlaboralDialogComponent,
        DatlaboralPopupComponent,
        DatlaboralDeleteDialogComponent,
        DatlaboralDeletePopupComponent,
    ],
    providers: [
        DatlaboralService,
        DatlaboralPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDatlaboralModule {}
