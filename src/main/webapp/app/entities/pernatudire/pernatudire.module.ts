import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PernatudireService,
    PernatudirePopupService,
    PernatudireComponent,
    PernatudireDetailComponent,
    PernatudireDialogComponent,
    PernatudirePopupComponent,
    PernatudireDeletePopupComponent,
    PernatudireDeleteDialogComponent,
    pernatudireRoute,
    pernatudirePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pernatudireRoute,
    ...pernatudirePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PernatudireComponent,
        PernatudireDetailComponent,
        PernatudireDialogComponent,
        PernatudireDeleteDialogComponent,
        PernatudirePopupComponent,
        PernatudireDeletePopupComponent,
    ],
    entryComponents: [
        PernatudireComponent,
        PernatudireDialogComponent,
        PernatudirePopupComponent,
        PernatudireDeleteDialogComponent,
        PernatudireDeletePopupComponent,
    ],
    providers: [
        PernatudireService,
        PernatudirePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPernatudireModule {}
