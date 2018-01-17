import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { StepsModule, ToggleButtonModule, CalendarModule, RadioButtonModule, DataTableModule, SharedModule,
    DialogModule, DropdownModule, ConfirmDialogModule, BlockUIModule } from 'primeng/primeng';
import {GrowlModule} from 'primeng/components/growl/growl';

import {
    AtencionLegajoComponent,
    AtencionLegajoRoute
} from './';

const ENTITY_STATES = [
    ...AtencionLegajoRoute
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        GatewaySharedModule,
        MessagesModule,
        MessageModule,
        StepsModule,
        ToggleButtonModule,
        CalendarModule,
        RadioButtonModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        DropdownModule,
        GrowlModule,
        ConfirmDialogModule,
        BlockUIModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionLegajoComponent
    ],
    entryComponents: [
        AtencionLegajoComponent
    ],
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionLegajoModule { }
