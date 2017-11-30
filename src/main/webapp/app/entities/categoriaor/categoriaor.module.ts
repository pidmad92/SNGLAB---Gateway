import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CategoriaorService,
    CategoriaorPopupService,
    CategoriaorComponent,
    CategoriaorDetailComponent,
    CategoriaorDialogComponent,
    CategoriaorPopupComponent,
    CategoriaorDeletePopupComponent,
    CategoriaorDeleteDialogComponent,
    categoriaorRoute,
    categoriaorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoriaorRoute,
    ...categoriaorPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoriaorComponent,
        CategoriaorDetailComponent,
        CategoriaorDialogComponent,
        CategoriaorDeleteDialogComponent,
        CategoriaorPopupComponent,
        CategoriaorDeletePopupComponent,
    ],
    entryComponents: [
        CategoriaorComponent,
        CategoriaorDialogComponent,
        CategoriaorPopupComponent,
        CategoriaorDeleteDialogComponent,
        CategoriaorDeletePopupComponent,
    ],
    providers: [
        CategoriaorService,
        CategoriaorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCategoriaorModule {}
