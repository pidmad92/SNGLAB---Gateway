import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    InfosoliService,
    InfosoliPopupService,
    InfosoliComponent,
    InfosoliDetailComponent,
    InfosoliDialogComponent,
    InfosoliPopupComponent,
    InfosoliDeletePopupComponent,
    InfosoliDeleteDialogComponent,
    infosoliRoute,
    infosoliPopupRoute,
} from './';

const ENTITY_STATES = [
    ...infosoliRoute,
    ...infosoliPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InfosoliComponent,
        InfosoliDetailComponent,
        InfosoliDialogComponent,
        InfosoliDeleteDialogComponent,
        InfosoliPopupComponent,
        InfosoliDeletePopupComponent,
    ],
    entryComponents: [
        InfosoliComponent,
        InfosoliDialogComponent,
        InfosoliPopupComponent,
        InfosoliDeleteDialogComponent,
        InfosoliDeletePopupComponent,
    ],
    providers: [
        InfosoliService,
        InfosoliPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInfosoliModule {}
