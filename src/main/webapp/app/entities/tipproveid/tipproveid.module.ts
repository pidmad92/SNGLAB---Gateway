import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipproveidService,
    TipproveidPopupService,
    TipproveidComponent,
    TipproveidDetailComponent,
    TipproveidDialogComponent,
    TipproveidPopupComponent,
    TipproveidDeletePopupComponent,
    TipproveidDeleteDialogComponent,
    tipproveidRoute,
    tipproveidPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipproveidRoute,
    ...tipproveidPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        TipproveidComponent,
        TipproveidDetailComponent,
        TipproveidDialogComponent,
        TipproveidDeleteDialogComponent,
        TipproveidPopupComponent,
        TipproveidDeletePopupComponent,
    ],
    entryComponents: [
        TipproveidComponent,
        TipproveidDialogComponent,
        TipproveidPopupComponent,
        TipproveidDeleteDialogComponent,
        TipproveidDeletePopupComponent,
    ],
    providers: [
        TipproveidService,
        TipproveidPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipproveidModule {}
