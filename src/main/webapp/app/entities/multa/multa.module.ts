import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MultaService,
    MultaPopupService,
    MultaComponent,
    MultaDetailComponent,
    MultaDialogComponent,
    MultaPopupComponent,
    MultaDeletePopupComponent,
    MultaDeleteDialogComponent,
    multaRoute,
    multaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...multaRoute,
    ...multaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MultaComponent,
        MultaDetailComponent,
        MultaDialogComponent,
        MultaDeleteDialogComponent,
        MultaPopupComponent,
        MultaDeletePopupComponent,
    ],
    entryComponents: [
        MultaComponent,
        MultaDialogComponent,
        MultaPopupComponent,
        MultaDeleteDialogComponent,
        MultaDeletePopupComponent,
    ],
    providers: [
        MultaService,
        MultaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMultaModule {}
