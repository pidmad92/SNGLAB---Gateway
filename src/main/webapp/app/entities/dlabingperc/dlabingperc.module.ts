import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DlabingpercService,
    DlabingpercPopupService,
    DlabingpercComponent,
    DlabingpercDetailComponent,
    DlabingpercDialogComponent,
    DlabingpercPopupComponent,
    DlabingpercDeletePopupComponent,
    DlabingpercDeleteDialogComponent,
    dlabingpercRoute,
    dlabingpercPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dlabingpercRoute,
    ...dlabingpercPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DlabingpercComponent,
        DlabingpercDetailComponent,
        DlabingpercDialogComponent,
        DlabingpercDeleteDialogComponent,
        DlabingpercPopupComponent,
        DlabingpercDeletePopupComponent,
    ],
    entryComponents: [
        DlabingpercComponent,
        DlabingpercDialogComponent,
        DlabingpercPopupComponent,
        DlabingpercDeleteDialogComponent,
        DlabingpercDeletePopupComponent,
    ],
    providers: [
        DlabingpercService,
        DlabingpercPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDlabingpercModule {}
