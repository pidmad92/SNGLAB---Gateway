import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DatdenuService,
    DatdenuPopupService,
    DatdenuComponent,
    DatdenuDetailComponent,
    DatdenuDialogComponent,
    DatdenuPopupComponent,
    DatdenuDeletePopupComponent,
    DatdenuDeleteDialogComponent,
    datdenuRoute,
    datdenuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...datdenuRoute,
    ...datdenuPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DatdenuComponent,
        DatdenuDetailComponent,
        DatdenuDialogComponent,
        DatdenuDeleteDialogComponent,
        DatdenuPopupComponent,
        DatdenuDeletePopupComponent,
    ],
    entryComponents: [
        DatdenuComponent,
        DatdenuDialogComponent,
        DatdenuPopupComponent,
        DatdenuDeleteDialogComponent,
        DatdenuDeletePopupComponent,
    ],
    providers: [
        DatdenuService,
        DatdenuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDatdenuModule {}
