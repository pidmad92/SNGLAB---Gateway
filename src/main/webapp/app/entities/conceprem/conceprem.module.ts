import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ConcepremService,
    ConcepremPopupService,
    ConcepremComponent,
    ConcepremDetailComponent,
    ConcepremDialogComponent,
    ConcepremPopupComponent,
    ConcepremDeletePopupComponent,
    ConcepremDeleteDialogComponent,
    concepremRoute,
    concepremPopupRoute,
} from './';

const ENTITY_STATES = [
    ...concepremRoute,
    ...concepremPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConcepremComponent,
        ConcepremDetailComponent,
        ConcepremDialogComponent,
        ConcepremDeleteDialogComponent,
        ConcepremPopupComponent,
        ConcepremDeletePopupComponent,
    ],
    entryComponents: [
        ConcepremComponent,
        ConcepremDialogComponent,
        ConcepremPopupComponent,
        ConcepremDeleteDialogComponent,
        ConcepremDeletePopupComponent,
    ],
    providers: [
        ConcepremService,
        ConcepremPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConcepremModule {}
