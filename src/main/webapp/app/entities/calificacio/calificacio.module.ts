import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalificacioService,
    CalificacioPopupService,
    CalificacioComponent,
    CalificacioDetailComponent,
    CalificacioDialogComponent,
    CalificacioPopupComponent,
    CalificacioDeletePopupComponent,
    CalificacioDeleteDialogComponent,
    calificacioRoute,
    calificacioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calificacioRoute,
    ...calificacioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CalificacioComponent,
        CalificacioDetailComponent,
        CalificacioDialogComponent,
        CalificacioDeleteDialogComponent,
        CalificacioPopupComponent,
        CalificacioDeletePopupComponent,
    ],
    entryComponents: [
        CalificacioComponent,
        CalificacioDialogComponent,
        CalificacioPopupComponent,
        CalificacioDeleteDialogComponent,
        CalificacioDeletePopupComponent,
    ],
    providers: [
        CalificacioService,
        CalificacioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalificacioModule {}
