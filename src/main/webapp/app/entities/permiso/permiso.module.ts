import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PermisoService,
    PermisoPopupService,
    PermisoComponent,
    PermisoDetailComponent,
    PermisoDialogComponent,
    PermisoPopupComponent,
    PermisoDeletePopupComponent,
    PermisoDeleteDialogComponent,
    permisoRoute,
    permisoPopupRoute,
    PermisoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...permisoRoute,
    ...permisoPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PermisoComponent,
        PermisoDetailComponent,
        PermisoDialogComponent,
        PermisoDeleteDialogComponent,
        PermisoPopupComponent,
        PermisoDeletePopupComponent,
    ],
    entryComponents: [
        PermisoComponent,
        PermisoDialogComponent,
        PermisoPopupComponent,
        PermisoDeleteDialogComponent,
        PermisoDeletePopupComponent,
    ],
    providers: [
        PermisoService,
        PermisoPopupService,
        PermisoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPermisoModule {}
