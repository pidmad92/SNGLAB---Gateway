import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SegsaludService,
    SegsaludPopupService,
    SegsaludComponent,
    SegsaludDetailComponent,
    SegsaludDialogComponent,
    SegsaludPopupComponent,
    SegsaludDeletePopupComponent,
    SegsaludDeleteDialogComponent,
    segsaludRoute,
    segsaludPopupRoute,
} from './';

const ENTITY_STATES = [
    ...segsaludRoute,
    ...segsaludPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SegsaludComponent,
        SegsaludDetailComponent,
        SegsaludDialogComponent,
        SegsaludDeleteDialogComponent,
        SegsaludPopupComponent,
        SegsaludDeletePopupComponent,
    ],
    entryComponents: [
        SegsaludComponent,
        SegsaludDialogComponent,
        SegsaludPopupComponent,
        SegsaludDeleteDialogComponent,
        SegsaludDeletePopupComponent,
    ],
    providers: [
        SegsaludService,
        SegsaludPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySegsaludModule {}
