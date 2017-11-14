import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EstexpedienService,
    EstexpedienPopupService,
    EstexpedienComponent,
    EstexpedienDetailComponent,
    EstexpedienDialogComponent,
    EstexpedienPopupComponent,
    EstexpedienDeletePopupComponent,
    EstexpedienDeleteDialogComponent,
    estexpedienRoute,
    estexpedienPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estexpedienRoute,
    ...estexpedienPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        EstexpedienComponent,
        EstexpedienDetailComponent,
        EstexpedienDialogComponent,
        EstexpedienDeleteDialogComponent,
        EstexpedienPopupComponent,
        EstexpedienDeletePopupComponent,
    ],
    entryComponents: [
        EstexpedienComponent,
        EstexpedienDialogComponent,
        EstexpedienPopupComponent,
        EstexpedienDeleteDialogComponent,
        EstexpedienDeletePopupComponent,
    ],
    providers: [
        EstexpedienService,
        EstexpedienPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEstexpedienModule {}
