import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DatlabService,
    DatlabPopupService,
    DatlabComponent,
    DatlabDetailComponent,
    DatlabDialogComponent,
    DatlabPopupComponent,
    DatlabDeletePopupComponent,
    DatlabDeleteDialogComponent,
    datlabRoute,
    datlabPopupRoute,
} from './';

const ENTITY_STATES = [
    ...datlabRoute,
    ...datlabPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatlabComponent,
        DatlabDetailComponent,
        DatlabDialogComponent,
        DatlabDeleteDialogComponent,
        DatlabPopupComponent,
        DatlabDeletePopupComponent,
    ],
    entryComponents: [
        DatlabComponent,
        DatlabDialogComponent,
        DatlabPopupComponent,
        DatlabDeleteDialogComponent,
        DatlabDeletePopupComponent,
    ],
    providers: [
        DatlabService,
        DatlabPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDatlabModule {}
