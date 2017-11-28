import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';

import { ValidarrucService,
    ValidarrucComponent,
    ValidarrucRoute
} from './';

const ENTITY_STATES = [
    ...ValidarrucRoute
    // ...accionadopPopupRoute,
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
        ValidarrucComponent
    ],
    entryComponents: [
        ValidarrucComponent
    ],
    providers: [
        ValidarrucService,
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ValidarrucModule {}
