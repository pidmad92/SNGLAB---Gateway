import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    GrupoService,
    GrupoPopupService,
    GrupoComponent,
    GrupoDetailComponent,
    GrupoDialogComponent,
    GrupoPopupComponent,
    GrupoDeletePopupComponent,
    GrupoDeleteDialogComponent,
    grupoRoute,
    grupoPopupRoute,
    GrupoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...grupoRoute,
    ...grupoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GrupoComponent,
        GrupoDetailComponent,
        GrupoDialogComponent,
        GrupoDeleteDialogComponent,
        GrupoPopupComponent,
        GrupoDeletePopupComponent,
    ],
    entryComponents: [
        GrupoComponent,
        GrupoDialogComponent,
        GrupoPopupComponent,
        GrupoDeleteDialogComponent,
        GrupoDeletePopupComponent,
    ],
    providers: [
        GrupoService,
        GrupoPopupService,
        GrupoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayGrupoModule {}
