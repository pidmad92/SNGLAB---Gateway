import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DelegadoService,
    DelegadoPopupService,
    DelegadoComponent,
    DelegadoDetailComponent,
    DelegadoDialogComponent,
    DelegadoPopupComponent,
    DelegadoDeletePopupComponent,
    DelegadoDeleteDialogComponent,
    delegadoRoute,
    delegadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...delegadoRoute,
    ...delegadoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DelegadoComponent,
        DelegadoDetailComponent,
        DelegadoDialogComponent,
        DelegadoDeleteDialogComponent,
        DelegadoPopupComponent,
        DelegadoDeletePopupComponent,
    ],
    entryComponents: [
        DelegadoComponent,
        DelegadoDialogComponent,
        DelegadoPopupComponent,
        DelegadoDeleteDialogComponent,
        DelegadoDeletePopupComponent,
    ],
    providers: [
        DelegadoService,
        DelegadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDelegadoModule {}
