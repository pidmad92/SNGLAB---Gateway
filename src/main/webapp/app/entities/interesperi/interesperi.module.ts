import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    InteresperiService,
    InteresperiPopupService,
    InteresperiComponent,
    InteresperiDetailComponent,
    InteresperiDialogComponent,
    InteresperiPopupComponent,
    InteresperiDeletePopupComponent,
    InteresperiDeleteDialogComponent,
    interesperiRoute,
    interesperiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...interesperiRoute,
    ...interesperiPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InteresperiComponent,
        InteresperiDetailComponent,
        InteresperiDialogComponent,
        InteresperiDeleteDialogComponent,
        InteresperiPopupComponent,
        InteresperiDeletePopupComponent,
    ],
    entryComponents: [
        InteresperiComponent,
        InteresperiDialogComponent,
        InteresperiPopupComponent,
        InteresperiDeleteDialogComponent,
        InteresperiDeletePopupComponent,
    ],
    providers: [
        InteresperiService,
        InteresperiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInteresperiModule {}
