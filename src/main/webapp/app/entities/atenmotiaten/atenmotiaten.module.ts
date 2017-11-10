import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AtenmotiatenService,
    AtenmotiatenPopupService,
    AtenmotiatenComponent,
    AtenmotiatenDetailComponent,
    AtenmotiatenDialogComponent,
    AtenmotiatenPopupComponent,
    AtenmotiatenDeletePopupComponent,
    AtenmotiatenDeleteDialogComponent,
    atenmotiatenRoute,
    atenmotiatenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atenmotiatenRoute,
    ...atenmotiatenPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtenmotiatenComponent,
        AtenmotiatenDetailComponent,
        AtenmotiatenDialogComponent,
        AtenmotiatenDeleteDialogComponent,
        AtenmotiatenPopupComponent,
        AtenmotiatenDeletePopupComponent,
    ],
    entryComponents: [
        AtenmotiatenComponent,
        AtenmotiatenDialogComponent,
        AtenmotiatenPopupComponent,
        AtenmotiatenDeleteDialogComponent,
        AtenmotiatenDeletePopupComponent,
    ],
    providers: [
        AtenmotiatenService,
        AtenmotiatenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAtenmotiatenModule {}
