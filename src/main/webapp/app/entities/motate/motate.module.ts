import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotateService,
    MotatePopupService,
    MotateComponent,
    MotateDetailComponent,
    MotateDialogComponent,
    MotatePopupComponent,
    MotateDeletePopupComponent,
    MotateDeleteDialogComponent,
    motateRoute,
    motatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...motateRoute,
    ...motatePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotateComponent,
        MotateDetailComponent,
        MotateDialogComponent,
        MotateDeleteDialogComponent,
        MotatePopupComponent,
        MotateDeletePopupComponent,
    ],
    entryComponents: [
        MotateComponent,
        MotateDialogComponent,
        MotatePopupComponent,
        MotateDeleteDialogComponent,
        MotateDeletePopupComponent,
    ],
    providers: [
        MotateService,
        MotatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotateModule {}
