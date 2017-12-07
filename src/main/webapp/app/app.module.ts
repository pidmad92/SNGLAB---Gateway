import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ng2-webstorage';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule, UserRouteAccessService } from './shared';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAccountModule } from './account/account.module';
import { LoginComponent } from './login/login.component';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    adminRoute,
    consultasRoute,
    defensaRoute,
    denunciasRoute,
    entityRoute,
    liquidacionesRoute,
    loginRoute,
    sindicatosRoute,
} from './app.routing';
import { GatewayprimengModule } from './primeng/primeng.module';

import { GatewayTipoEntidadModule } from './entities/tipo-entidad/tipo-entidad.module';
import { GatewayUsuarioHorarioModule } from './entities/usuario-horario/usuario-horario.module';
import { GatewayMenuModule } from './entities/menu/menu.module';
import { GatewayGrupoModule } from './entities/grupo/grupo.module';
import { GatewayEntidadModule } from './entities/entidad/entidad.module';
import { GatewayAplicacionModule } from './entities/aplicacion/aplicacion.module';
import { GatewayModuloModule } from './entities/modulo/modulo.module';
import { GatewayUsuarioGrupoModule } from './entities/usuario-grupo/usuario-grupo.module';
import { GatewayUsuarioModule } from './entities/usuario/usuario.module';
import { GatewayUsuPerModule } from './entities/usu-per/usu-per.module';
import { GatewayTipoUsuarioModule } from './entities/tipo-usuario/tipo-usuario.module';
import { GatewayPermisoModule } from './entities/permiso/permiso.module';
import { GatewayPerfilModule } from './entities/perfil/perfil.module';
import { GatewayListadoSolicitudesModule } from './applications/dictamenes/listado-solicitudes/listado-solicitudes.module';
import { GatewayRegistroSolicitudesModule } from './applications/dictamenes/registro-solicitudes/registro-solicitudes.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    LeftbarComponent,
    TopbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

const LAZY_ROUTES = [
    adminRoute,
    entityRoute,
    loginRoute,
    sindicatosRoute,
    consultasRoute,
    liquidacionesRoute,
    defensaRoute,
    denunciasRoute
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RouterModule.forRoot(LAZY_ROUTES, { useHash: true }),
        GatewaySharedModule,
        GatewayHomeModule,
        GatewayAccountModule,
        GatewayAplicacionModule,
        GatewayEntidadModule,
        GatewayGrupoModule,
        GatewayMenuModule,
        GatewayModuloModule,
        GatewayUsuarioHorarioModule,
        GatewayUsuarioGrupoModule,
        GatewayUsuarioModule,
        GatewayUsuPerModule,
        GatewayTipoUsuarioModule,
        GatewayTipoEntidadModule,
        GatewayPermisoModule,
        GatewayPerfilModule,
        GatewayListadoSolicitudesModule,
        GatewayRegistroSolicitudesModule,
        // GatewayprimengModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        LoginComponent,
        NavbarComponent,
        LeftbarComponent,
        TopbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class GatewayAppModule {}
