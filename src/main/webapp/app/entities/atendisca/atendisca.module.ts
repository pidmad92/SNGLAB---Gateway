import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AtendiscaService,
    AtendiscaPopupService,
    AtendiscaComponent,
    AtendiscaDetailComponent,
    AtendiscaDialogComponent,
    AtendiscaPopupComponent,
    AtendiscaDeletePopupComponent,
    AtendiscaDeleteDialogComponent,
    atendiscaRoute,
    atendiscaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atendiscaRoute,
    ...atendiscaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AtendiscaComponent,
        AtendiscaDetailComponent,
        AtendiscaDialogComponent,
        AtendiscaDeleteDialogComponent,
        AtendiscaPopupComponent,
        AtendiscaDeletePopupComponent,
    ],
    entryComponents: [
        AtendiscaComponent,
        AtendiscaDialogComponent,
        AtendiscaPopupComponent,
        AtendiscaDeleteDialogComponent,
        AtendiscaDeletePopupComponent,
    ],
    providers: [
        AtendiscaService,
        AtendiscaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAtendiscaModule {}
