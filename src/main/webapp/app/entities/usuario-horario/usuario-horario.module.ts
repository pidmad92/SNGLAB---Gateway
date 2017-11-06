import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    UsuarioHorarioService,
    UsuarioHorarioPopupService,
    UsuarioHorarioComponent,
    UsuarioHorarioDetailComponent,
    UsuarioHorarioDialogComponent,
    UsuarioHorarioPopupComponent,
    UsuarioHorarioDeletePopupComponent,
    UsuarioHorarioDeleteDialogComponent,
    usuarioHorarioRoute,
    usuarioHorarioPopupRoute,
    UsuarioHorarioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioHorarioRoute,
    ...usuarioHorarioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UsuarioHorarioComponent,
        UsuarioHorarioDetailComponent,
        UsuarioHorarioDialogComponent,
        UsuarioHorarioDeleteDialogComponent,
        UsuarioHorarioPopupComponent,
        UsuarioHorarioDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioHorarioComponent,
        UsuarioHorarioDialogComponent,
        UsuarioHorarioPopupComponent,
        UsuarioHorarioDeleteDialogComponent,
        UsuarioHorarioDeletePopupComponent,
    ],
    providers: [
        UsuarioHorarioService,
        UsuarioHorarioPopupService,
        UsuarioHorarioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUsuarioHorarioModule {}
