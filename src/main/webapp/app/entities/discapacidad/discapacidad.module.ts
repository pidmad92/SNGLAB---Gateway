import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DiscapacidadService,
    DiscapacidadPopupService,
    DiscapacidadComponent,
    DiscapacidadDetailComponent,
    DiscapacidadDialogComponent,
    DiscapacidadPopupComponent,
    DiscapacidadDeletePopupComponent,
    DiscapacidadDeleteDialogComponent,
    discapacidadRoute,
    discapacidadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...discapacidadRoute,
    ...discapacidadPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscapacidadComponent,
        DiscapacidadDetailComponent,
        DiscapacidadDialogComponent,
        DiscapacidadDeleteDialogComponent,
        DiscapacidadPopupComponent,
        DiscapacidadDeletePopupComponent,
    ],
    entryComponents: [
        DiscapacidadComponent,
        DiscapacidadDialogComponent,
        DiscapacidadPopupComponent,
        DiscapacidadDeleteDialogComponent,
        DiscapacidadDeletePopupComponent,
    ],
    providers: [
        DiscapacidadService,
        DiscapacidadPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDiscapacidadModule {}
