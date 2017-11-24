import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultaRecursoComponent } from './consulta-recurso.component';
import { RegistroObservacionComponent } from './registro-observacion.component';
import { PrincipalComponent } from './principal.component';

import { GatewaySharedModule } from '../../../shared';
import { RegistroRecursoService,
    RegistroRecursoComponent,
    NuevoRecursoComponent,
    RegistroRecursoRoute,
} from './';

const ENTITY_STATES = [
    ...RegistroRecursoRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroRecursoComponent,
        ConsultaRecursoComponent,
        RegistroObservacionComponent,
        PrincipalComponent,
        NuevoRecursoComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RegistroRecursoComponent,
        ConsultaRecursoComponent,
        RegistroObservacionComponent,
        PrincipalComponent,
        NuevoRecursoComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        RegistroRecursoService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroRecursoModule {}
