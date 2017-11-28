import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    HoraconService,
    HoraconPopupService,
    HoraconComponent,
    HoraconDetailComponent,
    HoraconDialogComponent,
    HoraconPopupComponent,
    HoraconDeletePopupComponent,
    HoraconDeleteDialogComponent,
    horaconRoute,
    horaconPopupRoute,
} from './';

const ENTITY_STATES = [
    ...horaconRoute,
    ...horaconPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HoraconComponent,
        HoraconDetailComponent,
        HoraconDialogComponent,
        HoraconDeleteDialogComponent,
        HoraconPopupComponent,
        HoraconDeletePopupComponent,
    ],
    entryComponents: [
        HoraconComponent,
        HoraconDialogComponent,
        HoraconPopupComponent,
        HoraconDeleteDialogComponent,
        HoraconDeletePopupComponent,
    ],
    providers: [
        HoraconService,
        HoraconPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHoraconModule {}
