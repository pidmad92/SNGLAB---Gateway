import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    RecursoService,
    RecursoPopupService,
    RecursoComponent,
    RecursoDetailComponent,
    RecursoDialogComponent,
    RecursoPopupComponent,
    RecursoDeletePopupComponent,
    RecursoDeleteDialogComponent,
    recursoRoute,
    recursoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...recursoRoute,
    ...recursoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RecursoComponent,
        RecursoDetailComponent,
        RecursoDialogComponent,
        RecursoDeleteDialogComponent,
        RecursoPopupComponent,
        RecursoDeletePopupComponent,
    ],
    entryComponents: [
        RecursoComponent,
        RecursoDialogComponent,
        RecursoPopupComponent,
        RecursoDeleteDialogComponent,
        RecursoDeletePopupComponent,
    ],
    providers: [
        RecursoService,
        RecursoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRecursoModule {}
