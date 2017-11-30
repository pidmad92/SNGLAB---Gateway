import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TipcalconreService,
    TipcalconrePopupService,
    TipcalconreComponent,
    TipcalconreDetailComponent,
    TipcalconreDialogComponent,
    TipcalconrePopupComponent,
    TipcalconreDeletePopupComponent,
    TipcalconreDeleteDialogComponent,
    tipcalconreRoute,
    tipcalconrePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipcalconreRoute,
    ...tipcalconrePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipcalconreComponent,
        TipcalconreDetailComponent,
        TipcalconreDialogComponent,
        TipcalconreDeleteDialogComponent,
        TipcalconrePopupComponent,
        TipcalconreDeletePopupComponent,
    ],
    entryComponents: [
        TipcalconreComponent,
        TipcalconreDialogComponent,
        TipcalconrePopupComponent,
        TipcalconreDeleteDialogComponent,
        TipcalconreDeletePopupComponent,
    ],
    providers: [
        TipcalconreService,
        TipcalconrePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTipcalconreModule {}
