import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ActiveconoService,
    ActiveconoPopupService,
    ActiveconoComponent,
    ActiveconoDetailComponent,
    ActiveconoDialogComponent,
    ActiveconoPopupComponent,
    ActiveconoDeletePopupComponent,
    ActiveconoDeleteDialogComponent,
    activeconoRoute,
    activeconoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...activeconoRoute,
    ...activeconoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActiveconoComponent,
        ActiveconoDetailComponent,
        ActiveconoDialogComponent,
        ActiveconoDeleteDialogComponent,
        ActiveconoPopupComponent,
        ActiveconoDeletePopupComponent,
    ],
    entryComponents: [
        ActiveconoComponent,
        ActiveconoDialogComponent,
        ActiveconoPopupComponent,
        ActiveconoDeleteDialogComponent,
        ActiveconoDeletePopupComponent,
    ],
    providers: [
        ActiveconoService,
        ActiveconoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayActiveconoModule {}
