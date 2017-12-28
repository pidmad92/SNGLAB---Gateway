import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import {
    RegistroAtencionRoute
} from './';

import { TrabajadorComponent } from './trabajador/trabajador.component';
import { EmpleadorComponent } from './empleador/empleador.component';
import { DatosLaboralesComponent } from './datos-laborales/datos-laborales.component';

const ENTITY_STATES = [
    ...RegistroAtencionRoute
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
        TrabajadorComponent,
        EmpleadorComponent,
        DatosLaboralesComponent
    ],
    entryComponents: [
    ],
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroAtencionModule { }
