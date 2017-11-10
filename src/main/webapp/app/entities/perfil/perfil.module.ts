import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PerfilService,
    PerfilPopupService,
    PerfilComponent,
    PerfilDetailComponent,
    PerfilDialogComponent,
    PerfilPopupComponent,
    PerfilDeletePopupComponent,
    PerfilDeleteDialogComponent,
    perfilRoute,
    perfilPopupRoute,
    PerfilResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...perfilRoute,
    ...perfilPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerfilComponent,
        PerfilDetailComponent,
        PerfilDialogComponent,
        PerfilDeleteDialogComponent,
        PerfilPopupComponent,
        PerfilDeletePopupComponent,
    ],
    entryComponents: [
        PerfilComponent,
        PerfilDialogComponent,
        PerfilPopupComponent,
        PerfilDeleteDialogComponent,
        PerfilDeletePopupComponent,
    ],
    providers: [
        PerfilService,
        PerfilPopupService,
        PerfilResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPerfilModule {}
