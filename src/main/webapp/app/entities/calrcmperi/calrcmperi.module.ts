import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CalrcmperiService,
    CalrcmperiPopupService,
    CalrcmperiComponent,
    CalrcmperiDetailComponent,
    CalrcmperiDialogComponent,
    CalrcmperiPopupComponent,
    CalrcmperiDeletePopupComponent,
    CalrcmperiDeleteDialogComponent,
    calrcmperiRoute,
    calrcmperiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calrcmperiRoute,
    ...calrcmperiPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CalrcmperiComponent,
        CalrcmperiDetailComponent,
        CalrcmperiDialogComponent,
        CalrcmperiDeleteDialogComponent,
        CalrcmperiPopupComponent,
        CalrcmperiDeletePopupComponent,
    ],
    entryComponents: [
        CalrcmperiComponent,
        CalrcmperiDialogComponent,
        CalrcmperiPopupComponent,
        CalrcmperiDeleteDialogComponent,
        CalrcmperiDeletePopupComponent,
    ],
    providers: [
        CalrcmperiService,
        CalrcmperiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCalrcmperiModule {}
