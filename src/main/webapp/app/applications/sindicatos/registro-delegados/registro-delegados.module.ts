import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultaDelegadosComponent } from './consulta-delegados.component';
import { IngresoDelegadosComponent } from './ingreso-delegados.component';

import { GatewaySharedModule } from '../../../shared';
import { RegistroDelegadosService,
    RegistroDelegadosComponent,
    RegistroDelegadosRoute,
} from './';

const ENTITY_STATES = [
    ...RegistroDelegadosRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroDelegadosComponent,
        ConsultaDelegadosComponent,
        IngresoDelegadosComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RegistroDelegadosComponent,
        ConsultaDelegadosComponent,
        IngresoDelegadosComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        RegistroDelegadosService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroDelegadosModule {}
