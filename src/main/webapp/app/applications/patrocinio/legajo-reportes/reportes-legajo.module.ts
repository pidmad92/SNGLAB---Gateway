import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import {
    ReporteLegajoComponent,
    ReporteLegajoRoute
} from './';

const ENTITY_STATES = [
    ...ReporteLegajoRoute
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReporteLegajoComponent
    ],
    entryComponents: [
        ReporteLegajoComponent
    ],
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReporteLegajoModule { }
