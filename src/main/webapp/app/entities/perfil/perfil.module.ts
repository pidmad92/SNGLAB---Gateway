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
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
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
