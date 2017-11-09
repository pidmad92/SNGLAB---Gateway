import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { DatosTrabajadorComponent } from './atencion-trabajador-wizard/datos-trabajador.component';
import { MotivosConsultaComponent } from './atencion-trabajador-wizard/motivos-consulta.component';
import { DatosEmpleadorComponent } from './atencion-trabajador-wizard/datos-empleador.component';
import { VinculoLaboralComponent } from './atencion-trabajador-wizard/vinculo-laboral.component';
import { DocumentosPresentadosComponent } from './atencion-trabajador-wizard/documentos-presentados.component';
import { AccionesRealizarComponent } from './atencion-trabajador-wizard/acciones-realizar.component';
import { AtencionTrabajadorService,
    AtencionTrabajadorComponent,
    AtencionTrabajadorWizardComponent,
    atencionTrabajadorRoute,
    accionadopPopupRoute
} from './';

const ENTITY_STATES = [
    ...atencionTrabajadorRoute,
    ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        StepsModule,
        DataTableModule,
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionTrabajadorComponent,
        AtencionTrabajadorWizardComponent,
        DatosTrabajadorComponent,
        MotivosConsultaComponent,
        DatosEmpleadorComponent,
        VinculoLaboralComponent,
        DocumentosPresentadosComponent,
        AccionesRealizarComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AtencionTrabajadorComponent,
        AtencionTrabajadorWizardComponent,
        DatosTrabajadorComponent,
        MotivosConsultaComponent,
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
