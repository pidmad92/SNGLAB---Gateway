import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NotificacionService,
    NotificacionPopupService,
    NotificacionComponent,
    NotificacionDetailComponent,
    NotificacionDialogComponent,
    NotificacionPopupComponent,
    NotificacionDeletePopupComponent,
    NotificacionDeleteDialogComponent,
    notificacionRoute,
    notificacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...notificacionRoute,
    ...notificacionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        NotificacionComponent,
        NotificacionDetailComponent,
        NotificacionDialogComponent,
        NotificacionDeleteDialogComponent,
        NotificacionPopupComponent,
        NotificacionDeletePopupComponent,
    ],
    entryComponents: [
        NotificacionComponent,
        NotificacionDialogComponent,
        NotificacionPopupComponent,
        NotificacionDeleteDialogComponent,
        NotificacionDeletePopupComponent,
    ],
    providers: [
        NotificacionService,
        NotificacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNotificacionModule {}
