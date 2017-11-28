import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipmotatenService,
    TipmotatenPopupService,
    TipmotatenComponent,
    TipmotatenDetailComponent,
    TipmotatenDialogComponent,
    TipmotatenPopupComponent,
    TipmotatenDeletePopupComponent,
    TipmotatenDeleteDialogComponent,
    tipmotatenRoute,
    tipmotatenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipmotatenRoute,
    ...tipmotatenPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipmotatenComponent,
        TipmotatenDetailComponent,
        TipmotatenDialogComponent,
        TipmotatenDeleteDialogComponent,
        TipmotatenPopupComponent,
        TipmotatenDeletePopupComponent,
    ],
    entryComponents: [
        TipmotatenComponent,
        TipmotatenDialogComponent,
        TipmotatenPopupComponent,
        TipmotatenDeleteDialogComponent,
        TipmotatenDeletePopupComponent,
    ],
    providers: [
        TipmotatenService,
        TipmotatenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipmotatenModule {}
