import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PerjuridicaService,
    PerjuridicaPopupService,
    PerjuridicaComponent,
    PerjuridicaDetailComponent,
    PerjuridicaDialogComponent,
    PerjuridicaPopupComponent,
    PerjuridicaDeletePopupComponent,
    PerjuridicaDeleteDialogComponent,
    perjuridicaRoute,
    perjuridicaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...perjuridicaRoute,
    ...perjuridicaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PerjuridicaComponent,
        PerjuridicaDetailComponent,
        PerjuridicaDialogComponent,
        PerjuridicaDeleteDialogComponent,
        PerjuridicaPopupComponent,
        PerjuridicaDeletePopupComponent,
    ],
    entryComponents: [
        PerjuridicaComponent,
        PerjuridicaDialogComponent,
        PerjuridicaPopupComponent,
        PerjuridicaDeleteDialogComponent,
        PerjuridicaDeletePopupComponent,
    ],
    providers: [
        PerjuridicaService,
        PerjuridicaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPerjuridicaModule {}
