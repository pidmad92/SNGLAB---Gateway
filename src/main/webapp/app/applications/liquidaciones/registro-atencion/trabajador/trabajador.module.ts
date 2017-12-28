import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../../shared';
import { MessagesModule, MessageModule, DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { TrabajadorComponent } from './trabajador.component';

/*
const ENTITY_STATES = [
    ...RegistroAtencionRoute
];
*/

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        GatewaySharedModule
        /*RouterModule.forChild(ENTITY_STATES)*/
    ],
    declarations: [
        TrabajadorComponent
    ],
    /*entryComponents: [
        RegistroAtencionComponent
    ],*/
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrabajadorModule { }
