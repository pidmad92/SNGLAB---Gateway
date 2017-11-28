import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultaRecursoComponent } from './consulta-recurso.component';
import { PrincipalComponent } from './principal.component';

import { GatewaySharedModule } from '../../../shared';
import { RegistroRecursoService,
    RegistroRecursoComponent,
    NuevoRecursoComponent,
    RegistroRecursoRoute,
} from './';

import { DropdownModule, RadioButtonModule, InputTextModule, TabViewModule, ChipsModule, CalendarModule, DataGridModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { SelectItem, FieldsetModule, CheckboxModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...RegistroRecursoRoute,
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
        RegistroRecursoComponent,
        ConsultaRecursoComponent,
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
