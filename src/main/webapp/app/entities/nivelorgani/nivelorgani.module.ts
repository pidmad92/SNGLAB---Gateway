import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NivelorganiService,
    NivelorganiPopupService,
    NivelorganiComponent,
    NivelorganiDetailComponent,
    NivelorganiDialogComponent,
    NivelorganiPopupComponent,
    NivelorganiDeletePopupComponent,
    NivelorganiDeleteDialogComponent,
    nivelorganiRoute,
    nivelorganiPopupRoute,
} from './';

const ENTITY_STATES = [
    ...nivelorganiRoute,
    ...nivelorganiPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NivelorganiComponent,
        NivelorganiDetailComponent,
        NivelorganiDialogComponent,
        NivelorganiDeleteDialogComponent,
        NivelorganiPopupComponent,
        NivelorganiDeletePopupComponent,
    ],
    entryComponents: [
        NivelorganiComponent,
        NivelorganiDialogComponent,
        NivelorganiPopupComponent,
        NivelorganiDeleteDialogComponent,
        NivelorganiDeletePopupComponent,
    ],
    providers: [
        NivelorganiService,
        NivelorganiPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNivelorganiModule {}
