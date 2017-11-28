import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ActieconService,
    ActieconPopupService,
    ActieconComponent,
    ActieconDetailComponent,
    ActieconDialogComponent,
    ActieconPopupComponent,
    ActieconDeletePopupComponent,
    ActieconDeleteDialogComponent,
    actieconRoute,
    actieconPopupRoute,
} from './';

const ENTITY_STATES = [
    ...actieconRoute,
    ...actieconPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActieconComponent,
        ActieconDetailComponent,
        ActieconDialogComponent,
        ActieconDeleteDialogComponent,
        ActieconPopupComponent,
        ActieconDeletePopupComponent,
    ],
    entryComponents: [
        ActieconComponent,
        ActieconDialogComponent,
        ActieconPopupComponent,
        ActieconDeleteDialogComponent,
        ActieconDeletePopupComponent,
    ],
    providers: [
        ActieconService,
        ActieconPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayActieconModule {}
