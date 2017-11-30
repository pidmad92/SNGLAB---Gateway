import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocpresateService,
    DocpresatePopupService,
    DocpresateComponent,
    DocpresateDetailComponent,
    DocpresateDialogComponent,
    DocpresatePopupComponent,
    DocpresateDeletePopupComponent,
    DocpresateDeleteDialogComponent,
    docpresateRoute,
    docpresatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...docpresateRoute,
    ...docpresatePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocpresateComponent,
        DocpresateDetailComponent,
        DocpresateDialogComponent,
        DocpresateDeleteDialogComponent,
        DocpresatePopupComponent,
        DocpresateDeletePopupComponent,
    ],
    entryComponents: [
        DocpresateComponent,
        DocpresateDialogComponent,
        DocpresatePopupComponent,
        DocpresateDeleteDialogComponent,
        DocpresateDeletePopupComponent,
    ],
    providers: [
        DocpresateService,
        DocpresatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocpresateModule {}
