import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    JuntadirectService,
    JuntadirectPopupService,
    JuntadirectComponent,
    JuntadirectDetailComponent,
    JuntadirectDialogComponent,
    JuntadirectPopupComponent,
    JuntadirectDeletePopupComponent,
    JuntadirectDeleteDialogComponent,
    juntadirectRoute,
    juntadirectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...juntadirectRoute,
    ...juntadirectPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JuntadirectComponent,
        JuntadirectDetailComponent,
        JuntadirectDialogComponent,
        JuntadirectDeleteDialogComponent,
        JuntadirectPopupComponent,
        JuntadirectDeletePopupComponent,
    ],
    entryComponents: [
        JuntadirectComponent,
        JuntadirectDialogComponent,
        JuntadirectPopupComponent,
        JuntadirectDeleteDialogComponent,
        JuntadirectDeletePopupComponent,
    ],
    providers: [
        JuntadirectService,
        JuntadirectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayJuntadirectModule {}
