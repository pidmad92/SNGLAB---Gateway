import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { RegistroExpedienteComponent } from './';

// const ENTITY_STATES = [
//     ...atencionEmpleadorRoute,
//     // ...accionadopPopupRoute,
// ];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroExpedienteComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RegistroExpedienteComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        // AtencionEmpleadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroExpedienteModule {}
