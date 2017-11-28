import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocingrperService,
    DocingrperPopupService,
    DocingrperComponent,
    DocingrperDetailComponent,
    DocingrperDialogComponent,
    DocingrperPopupComponent,
    DocingrperDeletePopupComponent,
    DocingrperDeleteDialogComponent,
    docingrperRoute,
    docingrperPopupRoute,
} from './';

const ENTITY_STATES = [
    ...docingrperRoute,
    ...docingrperPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocingrperComponent,
        DocingrperDetailComponent,
        DocingrperDialogComponent,
        DocingrperDeleteDialogComponent,
        DocingrperPopupComponent,
        DocingrperDeletePopupComponent,
    ],
    entryComponents: [
        DocingrperComponent,
        DocingrperDialogComponent,
        DocingrperPopupComponent,
        DocingrperDeleteDialogComponent,
        DocingrperDeletePopupComponent,
    ],
    providers: [
        DocingrperService,
        DocingrperPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocingrperModule {}
