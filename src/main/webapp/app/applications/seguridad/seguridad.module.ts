import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { GatewayTipoUsuarioModule } from '../../entities/tipo-usuario/tipo-usuario.module';
import { GatewayUsuarioModule } from '../../entities/usuario/usuario.module';
import { GatewayUsuarioHorarioModule } from '../../entities/usuario-horario/usuario-horario.module';
import { GatewayUsuarioGrupoModule } from '../../entities/usuario-grupo/usuario-grupo.module';
import { GatewayTipoEntidadModule } from '../../entities/tipo-entidad/tipo-entidad.module';
import { GatewayEntidadModule } from '../../entities/entidad/entidad.module';
import { GatewayPermisoModule } from '../../entities/permiso/permiso.module';
import { GatewayPerfilModule } from '../../entities/perfil/perfil.module';
import { GatewayMenuModule } from '../../entities/menu/menu.module';
import { GatewayGrupoModule } from '../../entities/grupo/grupo.module';
import { GatewayMenuPerfilModule } from '../../entities/menu-perfil/menu-perfil.module';
import { GatewayAplicacionModule } from '../../entities/aplicacion/aplicacion.module';
import { GatewayModuloModule } from '../../entities/modulo/modulo.module';
import { GatewayModuloEntidadModule } from '../../entities/modulo-entidad/modulo-entidad.module';
import { GatewayUsuPerModule } from '../../entities/usu-per/usu-per.module';
import { GatewaySharedModule } from './../../shared/shared.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayTipoUsuarioModule,
        GatewayUsuarioModule,
        GatewayUsuarioHorarioModule,
        GatewayUsuarioGrupoModule,
        GatewayTipoEntidadModule,
        GatewayEntidadModule,
        GatewayPermisoModule,
        GatewayPerfilModule,
        GatewayMenuModule,
        GatewayGrupoModule,
        GatewayMenuPerfilModule,
        GatewayAplicacionModule,
        GatewayModuloModule,
        GatewayModuloEntidadModule,
        GatewayUsuPerModule,
        GatewaySharedModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySeguridadModule {}
