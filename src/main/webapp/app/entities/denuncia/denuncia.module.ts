import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DenunciaService,
    DenunciaPopupService,
    DenunciaComponent,
    DenunciaDetailComponent,
    DenunciaDialogComponent,
    DenunciaPopupComponent,
    DenunciaDeletePopupComponent,
    DenunciaDeleteDialogComponent,
    denunciaRoute,
    denunciaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...denunciaRoute,
    ...denunciaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DenunciaComponent,
        DenunciaDetailComponent,
        DenunciaDialogComponent,
        DenunciaDeleteDialogComponent,
        DenunciaPopupComponent,
        DenunciaDeletePopupComponent,
    ],
    entryComponents: [
        DenunciaComponent,
        DenunciaDialogComponent,
        DenunciaPopupComponent,
        DenunciaDeleteDialogComponent,
        DenunciaDeletePopupComponent,
    ],
    providers: [
        DenunciaService,
        DenunciaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDenunciaModule {}
