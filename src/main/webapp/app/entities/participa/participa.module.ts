import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ParticipaService,
    ParticipaPopupService,
    ParticipaComponent,
    ParticipaDetailComponent,
    ParticipaDialogComponent,
    ParticipaPopupComponent,
    ParticipaDeletePopupComponent,
    ParticipaDeleteDialogComponent,
    participaRoute,
    participaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...participaRoute,
    ...participaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ParticipaComponent,
        ParticipaDetailComponent,
        ParticipaDialogComponent,
        ParticipaDeleteDialogComponent,
        ParticipaPopupComponent,
        ParticipaDeletePopupComponent,
    ],
    entryComponents: [
        ParticipaComponent,
        ParticipaDialogComponent,
        ParticipaPopupComponent,
        ParticipaDeleteDialogComponent,
        ParticipaDeletePopupComponent,
    ],
    providers: [
        ParticipaService,
        ParticipaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayParticipaModule {}
