
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { RegistroOrganizacionModule } from './registro-organizacion/registro-organizacion.module';

import { RegistroRecursoModule } from './registro-recurso/registro-recurso.module';

import { RegistroDelegadosModule } from './registro-delegados/registro-delegados.module';

import { RevisarSolicitudesModule } from './revisar-solicitudes/revisar-solicitudes.module';

import { BienvenidaModule } from './bienvenida/bienvenida.module';

import { BandejaModule } from './bandeja/bandeja.module';

import { AfiliarDesafiliarModule } from './afiliardesafiliar/afiliar-desafiliar.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RegistroOrganizacionModule,
        RegistroRecursoModule,
        RevisarSolicitudesModule,
        RegistroDelegadosModule,
        BienvenidaModule,
        BandejaModule,
        AfiliarDesafiliarModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySindicatosModule {}
