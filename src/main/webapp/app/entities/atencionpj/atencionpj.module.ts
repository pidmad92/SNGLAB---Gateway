import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AtencionpjService,
    AtencionpjPopupService,
    AtencionpjComponent,
    AtencionpjDetailComponent,
    AtencionpjDialogComponent,
    AtencionpjPopupComponent,
    AtencionpjDeletePopupComponent,
    AtencionpjDeleteDialogComponent,
    atencionpjRoute,
    atencionpjPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atencionpjRoute,
    ...atencionpjPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionpjComponent,
        AtencionpjDetailComponent,
        AtencionpjDialogComponent,
        AtencionpjDeleteDialogComponent,
        AtencionpjPopupComponent,
        AtencionpjDeletePopupComponent,
    ],
    entryComponents: [
        AtencionpjComponent,
        AtencionpjDialogComponent,
        AtencionpjPopupComponent,
        AtencionpjDeleteDialogComponent,
        AtencionpjDeletePopupComponent,
    ],
    providers: [
        AtencionpjService,
        AtencionpjPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAtencionpjModule {}
