import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import {
    RegistroLegajoComponent,
    registroLegajoRoute
} from './';
import { SeleccionLegajoComponent } from './legajo-registro-wizard/seleccion-legajo.component';
import { DatosTrabajadorComponent } from './legajo-registro-wizard/datos-trabajador.component';
import { DatosEmpleadorComponent } from './legajo-registro-wizard/datos-empleador.component';
import { DatosAbogadoComponent } from './legajo-registro-wizard/datos-abogado.component';
import { DatosResumenComponent } from './legajo-registro-wizard/datos-resumen.component';

const ENTITY_STATES = [
    ...registroLegajoRoute
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroLegajoComponent,
        DatosTrabajadorComponent,
        DatosEmpleadorComponent,
        SeleccionLegajoComponent,
        DatosAbogadoComponent,
        DatosResumenComponent
    ],
    entryComponents: [
        RegistroLegajoComponent,
        DatosTrabajadorComponent,
        DatosEmpleadorComponent,
        SeleccionLegajoComponent,
        DatosAbogadoComponent,
        DatosResumenComponent
    ],
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroLegajoModule { }
