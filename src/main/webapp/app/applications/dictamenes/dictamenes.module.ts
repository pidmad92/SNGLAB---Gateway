
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { GatewayListadoSolicitudesModule } from './listado-solicitudes/listado-solicitudes.module';
import { GatewayRegistroSolicitudesModule } from './registro-solicitudes/registro-solicitudes.module';
import { SolicitudComponent, SolicitudService } from '../../entities/solicitud/index';
import { UsusolService, UsusolComponent } from '../../entities/ususol/index';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayListadoSolicitudesModule,
        GatewayRegistroSolicitudesModule,
    ],
    declarations: [
        SolicitudComponent,
        UsusolComponent,
    ],
    entryComponents: [],
    providers: [
        customHttpProvider(),
        SolicitudService,
        UsusolService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDictamenesModule {}
