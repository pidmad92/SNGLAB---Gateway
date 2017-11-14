import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ConciliacionService,
    ConciliacionPopupService,
    ConciliacionComponent,
    ConciliacionDetailComponent,
    ConciliacionDialogComponent,
    ConciliacionPopupComponent,
    ConciliacionDeletePopupComponent,
    ConciliacionDeleteDialogComponent,
    conciliacionRoute,
    conciliacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...conciliacionRoute,
    ...conciliacionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConciliacionComponent,
        ConciliacionDetailComponent,
        ConciliacionDialogComponent,
        ConciliacionDeleteDialogComponent,
        ConciliacionPopupComponent,
        ConciliacionDeletePopupComponent,
    ],
    entryComponents: [
        ConciliacionComponent,
        ConciliacionDialogComponent,
        ConciliacionPopupComponent,
        ConciliacionDeleteDialogComponent,
        ConciliacionDeletePopupComponent,
    ],
    providers: [
        ConciliacionService,
        ConciliacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConciliacionModule {}
