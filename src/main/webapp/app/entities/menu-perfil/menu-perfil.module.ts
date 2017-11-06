import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MenuPerfilService,
    MenuPerfilPopupService,
    MenuPerfilComponent,
    MenuPerfilDetailComponent,
    MenuPerfilDialogComponent,
    MenuPerfilPopupComponent,
    MenuPerfilDeletePopupComponent,
    MenuPerfilDeleteDialogComponent,
    menuPerfilRoute,
    menuPerfilPopupRoute,
    MenuPerfilResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...menuPerfilRoute,
    ...menuPerfilPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MenuPerfilComponent,
        MenuPerfilDetailComponent,
        MenuPerfilDialogComponent,
        MenuPerfilDeleteDialogComponent,
        MenuPerfilPopupComponent,
        MenuPerfilDeletePopupComponent,
    ],
    entryComponents: [
        MenuPerfilComponent,
        MenuPerfilDialogComponent,
        MenuPerfilPopupComponent,
        MenuPerfilDeleteDialogComponent,
        MenuPerfilDeletePopupComponent,
    ],
    providers: [
        MenuPerfilService,
        MenuPerfilPopupService,
        MenuPerfilResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMenuPerfilModule {}
