import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import { ValidarUsuarioRoute } from './validarusuario.route';
import { ValidarUsuarioComponent } from './validarusuario.component';
import { LoginService } from '../../../shared/login/login.service';
import { PanelModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import {BlockUIModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { ValidarUsuarioService } from './validarusuario.service';

const ENTITY_STATES = [
    ...ValidarUsuarioRoute
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        PanelModule,
        TabViewModule,
        DropdownModule,
        BlockUIModule,
        ButtonModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ValidarUsuarioComponent
    ],
    entryComponents: [
        ValidarUsuarioComponent
    ],
    providers: [
        LoginService,
        MessageService,
        ValidarUsuarioService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ValidarUsuarioModule {}
