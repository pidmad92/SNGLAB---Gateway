import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EstatutoService,
    EstatutoPopupService,
    EstatutoComponent,
    EstatutoDetailComponent,
    EstatutoDialogComponent,
    EstatutoPopupComponent,
    EstatutoDeletePopupComponent,
    EstatutoDeleteDialogComponent,
    estatutoRoute,
    estatutoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estatutoRoute,
    ...estatutoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EstatutoComponent,
        EstatutoDetailComponent,
        EstatutoDialogComponent,
        EstatutoDeleteDialogComponent,
        EstatutoPopupComponent,
        EstatutoDeletePopupComponent,
    ],
    entryComponents: [
        EstatutoComponent,
        EstatutoDialogComponent,
        EstatutoPopupComponent,
        EstatutoDeleteDialogComponent,
        EstatutoDeletePopupComponent,
    ],
    providers: [
        EstatutoService,
        EstatutoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEstatutoModule {}
