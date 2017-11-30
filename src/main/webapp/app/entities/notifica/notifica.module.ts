import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NotificaService,
    NotificaPopupService,
    NotificaComponent,
    NotificaDetailComponent,
    NotificaDialogComponent,
    NotificaPopupComponent,
    NotificaDeletePopupComponent,
    NotificaDeleteDialogComponent,
    notificaRoute,
    notificaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...notificaRoute,
    ...notificaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificaComponent,
        NotificaDetailComponent,
        NotificaDialogComponent,
        NotificaDeleteDialogComponent,
        NotificaPopupComponent,
        NotificaDeletePopupComponent,
    ],
    entryComponents: [
        NotificaComponent,
        NotificaDialogComponent,
        NotificaPopupComponent,
        NotificaDeleteDialogComponent,
        NotificaDeletePopupComponent,
    ],
    providers: [
        NotificaService,
        NotificaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNotificaModule {}
