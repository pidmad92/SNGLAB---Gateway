import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import { AtencionEmpleadorService,
    AtencionEmpleadorComponent,
    atencionEmpleadorRoute,
} from './';

const ENTITY_STATES = [
    ...atencionEmpleadorRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionEmpleadorComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AtencionEmpleadorComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        AtencionEmpleadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionEmpleadorModule {}
