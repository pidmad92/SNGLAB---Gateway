import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DenunteService,
    DenuntePopupService,
    DenunteComponent,
    DenunteDetailComponent,
    DenunteDialogComponent,
    DenuntePopupComponent,
    DenunteDeletePopupComponent,
    DenunteDeleteDialogComponent,
    denunteRoute,
    denuntePopupRoute,
} from './';

const ENTITY_STATES = [
    ...denunteRoute,
    ...denuntePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DenunteComponent,
        DenunteDetailComponent,
        DenunteDialogComponent,
        DenunteDeleteDialogComponent,
        DenuntePopupComponent,
        DenunteDeletePopupComponent,
    ],
    entryComponents: [
        DenunteComponent,
        DenunteDialogComponent,
        DenuntePopupComponent,
        DenunteDeleteDialogComponent,
        DenunteDeletePopupComponent,
    ],
    providers: [
        DenunteService,
        DenuntePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDenunteModule {}
