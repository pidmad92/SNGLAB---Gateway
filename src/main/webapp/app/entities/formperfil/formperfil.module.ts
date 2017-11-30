import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FormperfilService,
    FormperfilPopupService,
    FormperfilComponent,
    FormperfilDetailComponent,
    FormperfilDialogComponent,
    FormperfilPopupComponent,
    FormperfilDeletePopupComponent,
    FormperfilDeleteDialogComponent,
    formperfilRoute,
    formperfilPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formperfilRoute,
    ...formperfilPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormperfilComponent,
        FormperfilDetailComponent,
        FormperfilDialogComponent,
        FormperfilDeleteDialogComponent,
        FormperfilPopupComponent,
        FormperfilDeletePopupComponent,
    ],
    entryComponents: [
        FormperfilComponent,
        FormperfilDialogComponent,
        FormperfilPopupComponent,
        FormperfilDeleteDialogComponent,
        FormperfilDeletePopupComponent,
    ],
    providers: [
        FormperfilService,
        FormperfilPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormperfilModule {}
