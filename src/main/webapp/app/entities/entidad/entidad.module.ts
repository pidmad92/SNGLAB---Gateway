import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    EntidadService,
    EntidadPopupService,
    EntidadComponent,
    EntidadDetailComponent,
    EntidadDialogComponent,
    EntidadPopupComponent,
    EntidadDeletePopupComponent,
    EntidadDeleteDialogComponent,
    entidadRoute,
    entidadPopupRoute,
    EntidadResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entidadRoute,
    ...entidadPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EntidadComponent,
        EntidadDetailComponent,
        EntidadDialogComponent,
        EntidadDeleteDialogComponent,
        EntidadPopupComponent,
        EntidadDeletePopupComponent,
    ],
    entryComponents: [
        EntidadComponent,
        EntidadDialogComponent,
        EntidadPopupComponent,
        EntidadDeleteDialogComponent,
        EntidadDeletePopupComponent,
    ],
    providers: [
        EntidadService,
        EntidadPopupService,
        EntidadResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntidadModule {}
