import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotivoceseService,
    MotivocesePopupService,
    MotivoceseComponent,
    MotivoceseDetailComponent,
    MotivoceseDialogComponent,
    MotivocesePopupComponent,
    MotivoceseDeletePopupComponent,
    MotivoceseDeleteDialogComponent,
    motivoceseRoute,
    motivocesePopupRoute,
} from './';

const ENTITY_STATES = [
    ...motivoceseRoute,
    ...motivocesePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotivoceseComponent,
        MotivoceseDetailComponent,
        MotivoceseDialogComponent,
        MotivoceseDeleteDialogComponent,
        MotivocesePopupComponent,
        MotivoceseDeletePopupComponent,
    ],
    entryComponents: [
        MotivoceseComponent,
        MotivoceseDialogComponent,
        MotivocesePopupComponent,
        MotivoceseDeleteDialogComponent,
        MotivoceseDeletePopupComponent,
    ],
    providers: [
        MotivoceseService,
        MotivocesePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotivoceseModule {}
