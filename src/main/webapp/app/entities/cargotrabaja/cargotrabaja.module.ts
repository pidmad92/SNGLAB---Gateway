import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    CargotrabajaService,
    CargotrabajaPopupService,
    CargotrabajaComponent,
    CargotrabajaDetailComponent,
    CargotrabajaDialogComponent,
    CargotrabajaPopupComponent,
    CargotrabajaDeletePopupComponent,
    CargotrabajaDeleteDialogComponent,
    cargotrabajaRoute,
    cargotrabajaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cargotrabajaRoute,
    ...cargotrabajaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CargotrabajaComponent,
        CargotrabajaDetailComponent,
        CargotrabajaDialogComponent,
        CargotrabajaDeleteDialogComponent,
        CargotrabajaPopupComponent,
        CargotrabajaDeletePopupComponent,
    ],
    entryComponents: [
        CargotrabajaComponent,
        CargotrabajaDialogComponent,
        CargotrabajaPopupComponent,
        CargotrabajaDeleteDialogComponent,
        CargotrabajaDeletePopupComponent,
    ],
    providers: [
        CargotrabajaService,
        CargotrabajaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCargotrabajaModule {}
