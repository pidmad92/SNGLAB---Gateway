import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule, UserRouteAccessService } from './shared';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAccountModule } from './account/account.module';
import { LoginComponent } from './login/login.component';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { entityRoute, adminRoute, loginRoute, seguridadRoute, consultasRoute, defensaRoute } from './app.routing';
import { GatewayprimengModule } from './primeng/primeng.module';
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
    seguridadRoute,
    consultasRoute,
    defensaRoute
];

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RouterModule.forRoot(LAZY_ROUTES, { useHash: true }),
        GatewaySharedModule,
        GatewayHomeModule,
        GatewayAccountModule,
        GatewayprimengModule,
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
