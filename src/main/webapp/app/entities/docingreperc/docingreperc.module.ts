import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocingrepercService,
    DocingrepercPopupService,
    DocingrepercComponent,
    DocingrepercDetailComponent,
    DocingrepercDialogComponent,
    DocingrepercPopupComponent,
    DocingrepercDeletePopupComponent,
    DocingrepercDeleteDialogComponent,
    docingrepercRoute,
    docingrepercPopupRoute,
} from './';

const ENTITY_STATES = [
    ...docingrepercRoute,
    ...docingrepercPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocingrepercComponent,
        DocingrepercDetailComponent,
        DocingrepercDialogComponent,
        DocingrepercDeleteDialogComponent,
        DocingrepercPopupComponent,
        DocingrepercDeletePopupComponent,
    ],
    entryComponents: [
        DocingrepercComponent,
        DocingrepercDialogComponent,
        DocingrepercPopupComponent,
        DocingrepercDeleteDialogComponent,
        DocingrepercDeletePopupComponent,
    ],
    providers: [
        DocingrepercService,
        DocingrepercPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocingrepercModule {}
