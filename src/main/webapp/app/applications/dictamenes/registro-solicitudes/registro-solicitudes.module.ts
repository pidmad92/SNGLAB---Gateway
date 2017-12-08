import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import {DialogModule, TabViewModule, DropdownModule, MessagesModule, MessageModule, BlockUIModule} from 'primeng/primeng';
import { RegistroSolicitudesRoute
       , RegistroSolicitudesComponent
       , RegistroSolicitudesService } from './';
import { SolicitudService, SolicitudComponent } from '../../../entities/solicitud/index';
import { UsusolService } from '../../../entities/ususol/index';

const ENTITY_STATES = [
    ...RegistroSolicitudesRoute,
];

@NgModule({
    declarations: [
        RegistroSolicitudesComponent,
    ],
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        DialogModule,
    ],
    entryComponents: [
        RegistroSolicitudesComponent,
    ],
    providers: [
        RegistroSolicitudesService,
        UsusolService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRegistroSolicitudesModule {}
