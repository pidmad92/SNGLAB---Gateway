import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocinperdlbService,
    DocinperdlbPopupService,
    DocinperdlbComponent,
    DocinperdlbDetailComponent,
    DocinperdlbDialogComponent,
    DocinperdlbPopupComponent,
    DocinperdlbDeletePopupComponent,
    DocinperdlbDeleteDialogComponent,
    docinperdlbRoute,
    docinperdlbPopupRoute,
} from './';

const ENTITY_STATES = [
    ...docinperdlbRoute,
    ...docinperdlbPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocinperdlbComponent,
        DocinperdlbDetailComponent,
        DocinperdlbDialogComponent,
        DocinperdlbDeleteDialogComponent,
        DocinperdlbPopupComponent,
        DocinperdlbDeletePopupComponent,
    ],
    entryComponents: [
        DocinperdlbComponent,
        DocinperdlbDialogComponent,
        DocinperdlbPopupComponent,
        DocinperdlbDeleteDialogComponent,
        DocinperdlbDeletePopupComponent,
    ],
    providers: [
        DocinperdlbService,
        DocinperdlbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocinperdlbModule {}
