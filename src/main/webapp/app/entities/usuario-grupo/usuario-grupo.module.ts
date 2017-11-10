import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    UsuarioGrupoService,
    UsuarioGrupoPopupService,
    UsuarioGrupoComponent,
    UsuarioGrupoDetailComponent,
    UsuarioGrupoDialogComponent,
    UsuarioGrupoPopupComponent,
    UsuarioGrupoDeletePopupComponent,
    UsuarioGrupoDeleteDialogComponent,
    usuarioGrupoRoute,
    usuarioGrupoPopupRoute,
    UsuarioGrupoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioGrupoRoute,
    ...usuarioGrupoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioGrupoComponent,
        UsuarioGrupoDetailComponent,
        UsuarioGrupoDialogComponent,
        UsuarioGrupoDeleteDialogComponent,
        UsuarioGrupoPopupComponent,
        UsuarioGrupoDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioGrupoComponent,
        UsuarioGrupoDialogComponent,
        UsuarioGrupoPopupComponent,
        UsuarioGrupoDeleteDialogComponent,
        UsuarioGrupoDeletePopupComponent,
    ],
    providers: [
        UsuarioGrupoService,
        UsuarioGrupoPopupService,
        UsuarioGrupoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUsuarioGrupoModule {}
