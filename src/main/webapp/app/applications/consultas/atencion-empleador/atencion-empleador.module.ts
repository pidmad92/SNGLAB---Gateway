import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/primeng';
import { TabViewModule, DataTableModule, CheckboxModule, SharedModule, CalendarModule,
    RadioButtonModule, DialogModule, DropdownModule, MessagesModule, MessageModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { DatosEmpleadorComponent } from './atencion-empleador-wizard/datos-empleador.component';
import { RegistroAtencionWizardService } from './atencion-empleador-wizard/registro-atencion-wizard.service';

import { GatewaySharedModule } from '../../../shared';
import { AtencionEmpleadorService,
    AtencionEmpleadorComponent,
    AtencionEmpleadorWizardComponent,
    atencionEmpleadorRoute,
    // accionadopPopupRoute,
} from './';

const ENTITY_STATES = [
    ...atencionEmpleadorRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        MessagesModule,
        MessageModule,
        StepsModule,
        DataTableModule,
        CheckboxModule,
        CalendarModule,
        DialogModule,
        RadioButtonModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionEmpleadorComponent,
        AtencionEmpleadorWizardComponent,
        DatosEmpleadorComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AtencionEmpleadorComponent,
        AtencionEmpleadorWizardComponent,
        DatosEmpleadorComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        AtencionEmpleadorService,
        MessageService,
        RegistroAtencionWizardService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionEmpleadorModule {}
