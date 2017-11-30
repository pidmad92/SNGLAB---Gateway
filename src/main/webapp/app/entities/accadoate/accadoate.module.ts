import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AccadoateService,
    AccadoatePopupService,
    AccadoateComponent,
    AccadoateDetailComponent,
    AccadoateDialogComponent,
    AccadoatePopupComponent,
    AccadoateDeletePopupComponent,
    AccadoateDeleteDialogComponent,
    accadoateRoute,
    accadoatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...accadoateRoute,
    ...accadoatePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AccadoateComponent,
        AccadoateDetailComponent,
        AccadoateDialogComponent,
        AccadoateDeleteDialogComponent,
        AccadoatePopupComponent,
        AccadoateDeletePopupComponent,
    ],
    entryComponents: [
        AccadoateComponent,
        AccadoateDialogComponent,
        AccadoatePopupComponent,
        AccadoateDeleteDialogComponent,
        AccadoateDeletePopupComponent,
    ],
    providers: [
        AccadoateService,
        AccadoatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAccadoateModule {}
