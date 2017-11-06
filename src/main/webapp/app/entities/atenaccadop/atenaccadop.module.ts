import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AtenaccadopService,
    AtenaccadopPopupService,
    AtenaccadopComponent,
    AtenaccadopDetailComponent,
    AtenaccadopDialogComponent,
    AtenaccadopPopupComponent,
    AtenaccadopDeletePopupComponent,
    AtenaccadopDeleteDialogComponent,
    atenaccadopRoute,
    atenaccadopPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atenaccadopRoute,
    ...atenaccadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AtenaccadopComponent,
        AtenaccadopDetailComponent,
        AtenaccadopDialogComponent,
        AtenaccadopDeleteDialogComponent,
        AtenaccadopPopupComponent,
        AtenaccadopDeletePopupComponent,
    ],
    entryComponents: [
        AtenaccadopComponent,
        AtenaccadopDialogComponent,
        AtenaccadopPopupComponent,
        AtenaccadopDeleteDialogComponent,
        AtenaccadopDeletePopupComponent,
    ],
    providers: [
        AtenaccadopService,
        AtenaccadopPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAtenaccadopModule {}
