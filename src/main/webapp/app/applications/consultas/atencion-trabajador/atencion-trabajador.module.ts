import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/primeng';
import { TabViewModule, DataTableModule, SharedModule, CalendarModule, RadioButtonModule, DialogModule, DropdownModule, MessagesModule, MessageModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

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
    accionadopPopupRoute,
    TipdocidentService,
    CartrabService,
    MotatenoficService,
    AccionadopService
} from './';

// import { FormsModule } from '@angular/forms';

const ENTITY_STATES = [
    ...atencionTrabajadorRoute,
    ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        MessagesModule,
        MessageModule,
        StepsModule,
        DataTableModule,
        CalendarModule,
        DialogModule,
        RadioButtonModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        SharedModule,
        RouterModule.forChild(ENTITY_STATES),
        // FormsModule
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
        MessageService,
        AtencionTrabajadorService,
        TipdocidentService,
        CartrabService,
        MotatenoficService,
        AccionadopService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionTrabajadorModule {}
