import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../shared';
import {
    UsuarioService,
    UsuarioPopupService,
    UsuarioHorariosPopupService,
    UsuarioPerfilesPopupService,
    UsuarioGruposPopupService,
    UsuarioComponent,
    UsuarioDetailComponent,
    UsuarioDialogComponent,
    UsuarioHorariosDialogComponent,
    UsuarioPerfilesDialogComponent,
    UsuarioGruposDialogComponent,
    UsuarioPopupComponent,
    UsuarioHorariosPopupComponent,
    UsuarioPerfilesPopupComponent,
    UsuarioGruposPopupComponent,
    UsuarioDeletePopupComponent,
    UsuarioDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute,
    UsuarioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        InputMaskModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioComponent,
        UsuarioDetailComponent,
        UsuarioDialogComponent,
        UsuarioHorariosDialogComponent,
        UsuarioPerfilesDialogComponent,
        UsuarioGruposDialogComponent,
        UsuarioDeleteDialogComponent,
        UsuarioPopupComponent,
        UsuarioHorariosPopupComponent,
        UsuarioPerfilesPopupComponent,
        UsuarioGruposPopupComponent,
        UsuarioDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioComponent,
        UsuarioDialogComponent,
        UsuarioHorariosDialogComponent,
        UsuarioPerfilesDialogComponent,
        UsuarioGruposDialogComponent,
        UsuarioPopupComponent,
        UsuarioHorariosPopupComponent,
        UsuarioPerfilesPopupComponent,
        UsuarioGruposPopupComponent,
        UsuarioDeleteDialogComponent,
        UsuarioDeletePopupComponent,
    ],
    providers: [
        UsuarioService,
        UsuarioPopupService,
        UsuarioHorariosPopupService,
        UsuarioPerfilesPopupService,
        UsuarioGruposPopupService,
        UsuarioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUsuarioModule {}
