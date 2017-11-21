import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegistroJdComponent } from './registro-jd.component';
import { RegistroCargoComponent } from './registro-cargo.component';
import { RegistroEstatutoComponent } from './registro-estatuto.component';
import { RegistroAfiliadoComponent } from './registro-afiliado.component';
import { RegistroFederacionComponent } from './registro-federacion.component';
import { RegistroConfederacionComponent } from './registro-confederacion.component';
import { ConsultaOrganizacionComponent } from './consulta-organizacion.component';

import { GatewaySharedModule } from '../../../shared';
import { RegistroOrganizacionService,
    RegistroOrganizacionComponent,
    RegistroOrganizacionRoute,
} from './';

const ENTITY_STATES = [
    ...RegistroOrganizacionRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroOrganizacionComponent,
        RegistroJdComponent,
        RegistroCargoComponent,
        RegistroEstatutoComponent,
        RegistroAfiliadoComponent,
        RegistroFederacionComponent,
        RegistroConfederacionComponent,
        ConsultaOrganizacionComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        RegistroOrganizacionComponent,
        RegistroJdComponent,
        RegistroCargoComponent,
        RegistroEstatutoComponent,
        RegistroAfiliadoComponent,
        RegistroFederacionComponent,
        RegistroConfederacionComponent,
        ConsultaOrganizacionComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        RegistroOrganizacionService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroOrganizacionModule {}