import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TippersonaService,
    TippersonaPopupService,
    TippersonaComponent,
    TippersonaDetailComponent,
    TippersonaDialogComponent,
    TippersonaPopupComponent,
    TippersonaDeletePopupComponent,
    TippersonaDeleteDialogComponent,
    tippersonaRoute,
    tippersonaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tippersonaRoute,
    ...tippersonaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TippersonaComponent,
        TippersonaDetailComponent,
        TippersonaDialogComponent,
        TippersonaDeleteDialogComponent,
        TippersonaPopupComponent,
        TippersonaDeletePopupComponent,
    ],
    entryComponents: [
        TippersonaComponent,
        TippersonaDialogComponent,
        TippersonaPopupComponent,
        TippersonaDeleteDialogComponent,
        TippersonaDeletePopupComponent,
    ],
    providers: [
        TippersonaService,
        TippersonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTippersonaModule {}
