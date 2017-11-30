import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipresolucService,
    TipresolucPopupService,
    TipresolucComponent,
    TipresolucDetailComponent,
    TipresolucDialogComponent,
    TipresolucPopupComponent,
    TipresolucDeletePopupComponent,
    TipresolucDeleteDialogComponent,
    tipresolucRoute,
    tipresolucPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipresolucRoute,
    ...tipresolucPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipresolucComponent,
        TipresolucDetailComponent,
        TipresolucDialogComponent,
        TipresolucDeleteDialogComponent,
        TipresolucPopupComponent,
        TipresolucDeletePopupComponent,
    ],
    entryComponents: [
        TipresolucComponent,
        TipresolucDialogComponent,
        TipresolucPopupComponent,
        TipresolucDeleteDialogComponent,
        TipresolucDeletePopupComponent,
    ],
    providers: [
        TipresolucService,
        TipresolucPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipresolucModule {}
