import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AfiliadoService,
    AfiliadoPopupService,
    AfiliadoComponent,
    AfiliadoDetailComponent,
    AfiliadoDialogComponent,
    AfiliadoPopupComponent,
    AfiliadoDeletePopupComponent,
    AfiliadoDeleteDialogComponent,
    afiliadoRoute,
    afiliadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...afiliadoRoute,
    ...afiliadoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AfiliadoComponent,
        AfiliadoDetailComponent,
        AfiliadoDialogComponent,
        AfiliadoDeleteDialogComponent,
        AfiliadoPopupComponent,
        AfiliadoDeletePopupComponent,
    ],
    entryComponents: [
        AfiliadoComponent,
        AfiliadoDialogComponent,
        AfiliadoPopupComponent,
        AfiliadoDeleteDialogComponent,
        AfiliadoDeletePopupComponent,
    ],
    providers: [
        AfiliadoService,
        AfiliadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAfiliadoModule {}
