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
        RouterModule.forChild(ENTITY_STATES )
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
