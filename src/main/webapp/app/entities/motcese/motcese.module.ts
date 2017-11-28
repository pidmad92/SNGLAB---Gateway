import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotceseService,
    MotcesePopupService,
    MotceseComponent,
    MotceseDetailComponent,
    MotceseDialogComponent,
    MotcesePopupComponent,
    MotceseDeletePopupComponent,
    MotceseDeleteDialogComponent,
    motceseRoute,
    motcesePopupRoute,
} from './';

const ENTITY_STATES = [
    ...motceseRoute,
    ...motcesePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotceseComponent,
        MotceseDetailComponent,
        MotceseDialogComponent,
        MotceseDeleteDialogComponent,
        MotcesePopupComponent,
        MotceseDeletePopupComponent,
    ],
    entryComponents: [
        MotceseComponent,
        MotceseDialogComponent,
        MotcesePopupComponent,
        MotceseDeleteDialogComponent,
        MotceseDeletePopupComponent,
    ],
    providers: [
        MotceseService,
        MotcesePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotceseModule {}
