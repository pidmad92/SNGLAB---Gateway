import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocexpedienService,
    DocexpedienPopupService,
    DocexpedienComponent,
    DocexpedienDetailComponent,
    DocexpedienDialogComponent,
    DocexpedienPopupComponent,
    DocexpedienDeletePopupComponent,
    DocexpedienDeleteDialogComponent,
    docexpedienRoute,
    docexpedienPopupRoute,
} from './';

const ENTITY_STATES = [
    ...docexpedienRoute,
    ...docexpedienPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        DocexpedienComponent,
        DocexpedienDetailComponent,
        DocexpedienDialogComponent,
        DocexpedienDeleteDialogComponent,
        DocexpedienPopupComponent,
        DocexpedienDeletePopupComponent,
    ],
    entryComponents: [
        DocexpedienComponent,
        DocexpedienDialogComponent,
        DocexpedienPopupComponent,
        DocexpedienDeleteDialogComponent,
        DocexpedienDeletePopupComponent,
    ],
    providers: [
        DocexpedienService,
        DocexpedienPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocexpedienModule {}
