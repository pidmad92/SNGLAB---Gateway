import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EstpericalService,
    EstpericalPopupService,
    EstpericalComponent,
    EstpericalDetailComponent,
    EstpericalDialogComponent,
    EstpericalPopupComponent,
    EstpericalDeletePopupComponent,
    EstpericalDeleteDialogComponent,
    estpericalRoute,
    estpericalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estpericalRoute,
    ...estpericalPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstpericalComponent,
        EstpericalDetailComponent,
        EstpericalDialogComponent,
        EstpericalDeleteDialogComponent,
        EstpericalPopupComponent,
        EstpericalDeletePopupComponent,
    ],
    entryComponents: [
        EstpericalComponent,
        EstpericalDialogComponent,
        EstpericalPopupComponent,
        EstpericalDeleteDialogComponent,
        EstpericalDeletePopupComponent,
    ],
    providers: [
        EstpericalService,
        EstpericalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEstpericalModule {}
