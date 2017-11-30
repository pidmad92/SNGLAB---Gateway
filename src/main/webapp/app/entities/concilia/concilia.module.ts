import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ConciliaService,
    ConciliaPopupService,
    ConciliaComponent,
    ConciliaDetailComponent,
    ConciliaDialogComponent,
    ConciliaPopupComponent,
    ConciliaDeletePopupComponent,
    ConciliaDeleteDialogComponent,
    conciliaRoute,
    conciliaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...conciliaRoute,
    ...conciliaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConciliaComponent,
        ConciliaDetailComponent,
        ConciliaDialogComponent,
        ConciliaDeleteDialogComponent,
        ConciliaPopupComponent,
        ConciliaDeletePopupComponent,
    ],
    entryComponents: [
        ConciliaComponent,
        ConciliaDialogComponent,
        ConciliaPopupComponent,
        ConciliaDeleteDialogComponent,
        ConciliaDeletePopupComponent,
    ],
    providers: [
        ConciliaService,
        ConciliaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConciliaModule {}
