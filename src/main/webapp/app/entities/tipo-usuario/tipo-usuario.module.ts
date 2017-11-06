import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipoUsuarioService,
    TipoUsuarioPopupService,
    TipoUsuarioComponent,
    TipoUsuarioDetailComponent,
    TipoUsuarioDialogComponent,
    TipoUsuarioPopupComponent,
    TipoUsuarioDeletePopupComponent,
    TipoUsuarioDeleteDialogComponent,
    tipoUsuarioRoute,
    tipoUsuarioPopupRoute,
    TipoUsuarioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tipoUsuarioRoute,
    ...tipoUsuarioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoUsuarioComponent,
        TipoUsuarioDetailComponent,
        TipoUsuarioDialogComponent,
        TipoUsuarioDeleteDialogComponent,
        TipoUsuarioPopupComponent,
        TipoUsuarioDeletePopupComponent,
    ],
    entryComponents: [
        TipoUsuarioComponent,
        TipoUsuarioDialogComponent,
        TipoUsuarioPopupComponent,
        TipoUsuarioDeleteDialogComponent,
        TipoUsuarioDeletePopupComponent,
    ],
    providers: [
        TipoUsuarioService,
        TipoUsuarioPopupService,
        TipoUsuarioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipoUsuarioModule {}
