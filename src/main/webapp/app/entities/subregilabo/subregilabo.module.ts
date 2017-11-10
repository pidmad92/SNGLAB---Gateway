import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SubregilaboService,
    SubregilaboPopupService,
    SubregilaboComponent,
    SubregilaboDetailComponent,
    SubregilaboDialogComponent,
    SubregilaboPopupComponent,
    SubregilaboDeletePopupComponent,
    SubregilaboDeleteDialogComponent,
    subregilaboRoute,
    subregilaboPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subregilaboRoute,
    ...subregilaboPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubregilaboComponent,
        SubregilaboDetailComponent,
        SubregilaboDialogComponent,
        SubregilaboDeleteDialogComponent,
        SubregilaboPopupComponent,
        SubregilaboDeletePopupComponent,
    ],
    entryComponents: [
        SubregilaboComponent,
        SubregilaboDialogComponent,
        SubregilaboPopupComponent,
        SubregilaboDeleteDialogComponent,
        SubregilaboDeletePopupComponent,
    ],
    providers: [
        SubregilaboService,
        SubregilaboPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySubregilaboModule {}
