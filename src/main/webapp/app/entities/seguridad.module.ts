import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../blocks/interceptor/http.provider';

import { GatewayTipoUsuarioModule } from './tipo-usuario/tipo-usuario.module';
import { GatewayUsuarioModule } from './usuario/usuario.module';
import { GatewayUsuarioHorarioModule } from './usuario-horario/usuario-horario.module';
import { GatewayUsuarioGrupoModule } from './usuario-grupo/usuario-grupo.module';
import { GatewayTipoEntidadModule } from './tipo-entidad/tipo-entidad.module';
import { GatewayEntidadModule } from './entidad/entidad.module';
import { GatewayPermisoModule } from './permiso/permiso.module';
import { GatewayPerfilModule } from './perfil/perfil.module';
import { GatewayMenuModule } from './menu/menu.module';
import { GatewayGrupoModule } from './grupo/grupo.module';
import { GatewayMenuPerfilModule } from './menu-perfil/menu-perfil.module';
import { GatewayAplicacionModule } from './aplicacion/aplicacion.module';
import { GatewayModuloModule } from './modulo/modulo.module';
import { GatewayModuloEntidadModule } from './modulo-entidad/modulo-entidad.module';
import { GatewayUsuPerModule } from './usu-per/usu-per.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        // GatewayTipoUsuarioModule,
        // GatewayUsuarioModule,
        // GatewayUsuarioHorarioModule,
        // GatewayUsuarioGrupoModule,
        // GatewayTipoEntidadModule,
        // GatewayEntidadModule,
        // GatewayPermisoModule,
        // GatewayPerfilModule,
        // GatewayMenuModule,
        // GatewayGrupoModule,
        // GatewayMenuPerfilModule,
        GatewayAplicacionModule,
        // GatewayModuloModule,
        // GatewayModuloEntidadModule,
        // GatewayUsuPerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeguridadModule {}
