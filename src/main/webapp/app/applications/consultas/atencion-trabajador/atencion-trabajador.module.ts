import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { AtencionTrabajadorService,
    AtencionTrabajadorComponent,
    DatosTrabajadorComponent,
    atencionTrabajadorRoute
} from './';

const ENTITY_STATES = [
    ...atencionTrabajadorRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionTrabajadorComponent,
        DatosTrabajadorComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AtencionTrabajadorComponent,
        DatosTrabajadorComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        AtencionTrabajadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionTrabajadorModule {}
