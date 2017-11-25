import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NegocolectService,
    NegocolectPopupService,
    NegocolectComponent,
    NegocolectDetailComponent,
    NegocolectDialogComponent,
    NegocolectPopupComponent,
    NegocolectDeletePopupComponent,
    NegocolectDeleteDialogComponent,
    negocolectRoute,
    negocolectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...negocolectRoute,
    ...negocolectPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        NegocolectComponent,
        NegocolectDetailComponent,
        NegocolectDialogComponent,
        NegocolectDeleteDialogComponent,
        NegocolectPopupComponent,
        NegocolectDeletePopupComponent,
    ],
    entryComponents: [
        NegocolectComponent,
        NegocolectDialogComponent,
        NegocolectPopupComponent,
        NegocolectDeleteDialogComponent,
        NegocolectDeletePopupComponent,
    ],
    providers: [
        NegocolectService,
        NegocolectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNegocolectModule {}
