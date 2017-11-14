import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AbogadoService,
    AbogadoPopupService,
    AbogadoComponent,
    AbogadoDetailComponent,
    AbogadoDialogComponent,
    AbogadoPopupComponent,
    AbogadoDeletePopupComponent,
    AbogadoDeleteDialogComponent,
    abogadoRoute,
    abogadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...abogadoRoute,
    ...abogadoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES )
    ],
    declarations: [
        AbogadoComponent,
        AbogadoDetailComponent,
        AbogadoDialogComponent,
        AbogadoDeleteDialogComponent,
        AbogadoPopupComponent,
        AbogadoDeletePopupComponent,
    ],
    entryComponents: [
        AbogadoComponent,
        AbogadoDialogComponent,
        AbogadoPopupComponent,
        AbogadoDeleteDialogComponent,
        AbogadoDeletePopupComponent,
    ],
    providers: [
        AbogadoService,
        AbogadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAbogadoModule {}
