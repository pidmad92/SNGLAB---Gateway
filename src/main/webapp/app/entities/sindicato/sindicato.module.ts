import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SindicatoService,
    SindicatoPopupService,
    SindicatoComponent,
    SindicatoDetailComponent,
    SindicatoDialogComponent,
    SindicatoPopupComponent,
    SindicatoDeletePopupComponent,
    SindicatoDeleteDialogComponent,
    sindicatoRoute,
    sindicatoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sindicatoRoute,
    ...sindicatoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SindicatoComponent,
        SindicatoDetailComponent,
        SindicatoDialogComponent,
        SindicatoDeleteDialogComponent,
        SindicatoPopupComponent,
        SindicatoDeletePopupComponent,
    ],
    entryComponents: [
        SindicatoComponent,
        SindicatoDialogComponent,
        SindicatoPopupComponent,
        SindicatoDeleteDialogComponent,
        SindicatoDeletePopupComponent,
    ],
    providers: [
        SindicatoService,
        SindicatoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySindicatoModule {}
