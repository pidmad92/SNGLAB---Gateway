import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DlabingrpercService,
    DlabingrpercPopupService,
    DlabingrpercComponent,
    DlabingrpercDetailComponent,
    DlabingrpercDialogComponent,
    DlabingrpercPopupComponent,
    DlabingrpercDeletePopupComponent,
    DlabingrpercDeleteDialogComponent,
    dlabingrpercRoute,
    dlabingrpercPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dlabingrpercRoute,
    ...dlabingrpercPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DlabingrpercComponent,
        DlabingrpercDetailComponent,
        DlabingrpercDialogComponent,
        DlabingrpercDeleteDialogComponent,
        DlabingrpercPopupComponent,
        DlabingrpercDeletePopupComponent,
    ],
    entryComponents: [
        DlabingrpercComponent,
        DlabingrpercDialogComponent,
        DlabingrpercPopupComponent,
        DlabingrpercDeleteDialogComponent,
        DlabingrpercDeletePopupComponent,
    ],
    providers: [
        DlabingrpercService,
        DlabingrpercPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDlabingrpercModule {}
