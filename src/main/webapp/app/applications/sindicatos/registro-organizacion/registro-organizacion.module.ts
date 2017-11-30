import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegistroJdComponent } from './registro-jd.component';
import { RegistroCargoComponent } from './registro-cargo.component';
import { RegistroEstatutoComponent } from './registro-estatuto.component';
import { RegistroAfiliadoComponent } from './registro-afiliado.component';
import { RegistroFederacionComponent } from './registro-federacion.component';
import { RegistroConfederacionComponent } from './registro-confederacion.component';
import { ConsultaOrganizacionComponent } from './consulta-organizacion.component';
import { PrincipalComponent } from './principal.component';

import { DropdownModule, RadioButtonModule, InputTextModule, TabViewModule, ChipsModule, CalendarModule, DataGridModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { SelectItem, FieldsetModule, CheckboxModule } from 'primeng/primeng';

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
        ChipsModule,
        FieldsetModule,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        DataTableModule,
        DropdownModule,
        TabViewModule,
        DataGridModule,
        CalendarModule,
        SharedModule,
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
        PrincipalComponent,
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
        PrincipalComponent,
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
