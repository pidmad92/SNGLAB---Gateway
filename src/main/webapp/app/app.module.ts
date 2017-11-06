
import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule, UserRouteAccessService } from './shared';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAdminModule } from './admin/admin.module';
import { GatewayAccountModule } from './account/account.module';
import { GatewayEntityModule } from './entities/entity.module';
import { LoginComponent } from './login/login.component';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { entityRoute, adminRoute, loginRoute } from './app.routing';

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
    loginRoute
];

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RouterModule.forRoot(LAZY_ROUTES, { useHash: true }),
        GatewaySharedModule,
        GatewayHomeModule,
        GatewayAdminModule,
        GatewayAccountModule,
        GatewayEntityModule,
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
