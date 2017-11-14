import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ResulconciService,
    ResulconciPopupService,
    ResulconciComponent,
    ResulconciDetailComponent,
    ResulconciDialogComponent,
    ResulconciPopupComponent,
    ResulconciDeletePopupComponent,
    ResulconciDeleteDialogComponent,
    resulconciRoute,
    resulconciPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resulconciRoute,
    ...resulconciPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        ResulconciComponent,
        ResulconciDetailComponent,
        ResulconciDialogComponent,
        ResulconciDeleteDialogComponent,
        ResulconciPopupComponent,
        ResulconciDeletePopupComponent,
    ],
    entryComponents: [
        ResulconciComponent,
        ResulconciDialogComponent,
        ResulconciPopupComponent,
        ResulconciDeleteDialogComponent,
        ResulconciDeletePopupComponent,
    ],
    providers: [
        ResulconciService,
        ResulconciPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayResulconciModule {}
