import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalificaService,
    CalificaPopupService,
    CalificaComponent,
    CalificaDetailComponent,
    CalificaDialogComponent,
    CalificaPopupComponent,
    CalificaDeletePopupComponent,
    CalificaDeleteDialogComponent,
    calificaRoute,
    calificaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calificaRoute,
    ...calificaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CalificaComponent,
        CalificaDetailComponent,
        CalificaDialogComponent,
        CalificaDeleteDialogComponent,
        CalificaPopupComponent,
        CalificaDeletePopupComponent,
    ],
    entryComponents: [
        CalificaComponent,
        CalificaDialogComponent,
        CalificaPopupComponent,
        CalificaDeleteDialogComponent,
        CalificaDeletePopupComponent,
    ],
    providers: [
        CalificaService,
        CalificaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalificaModule {}
