import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ResolucrdService,
    ResolucrdPopupService,
    ResolucrdComponent,
    ResolucrdDetailComponent,
    ResolucrdDialogComponent,
    ResolucrdPopupComponent,
    ResolucrdDeletePopupComponent,
    ResolucrdDeleteDialogComponent,
    resolucrdRoute,
    resolucrdPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resolucrdRoute,
    ...resolucrdPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResolucrdComponent,
        ResolucrdDetailComponent,
        ResolucrdDialogComponent,
        ResolucrdDeleteDialogComponent,
        ResolucrdPopupComponent,
        ResolucrdDeletePopupComponent,
    ],
    entryComponents: [
        ResolucrdComponent,
        ResolucrdDialogComponent,
        ResolucrdPopupComponent,
        ResolucrdDeleteDialogComponent,
        ResolucrdDeletePopupComponent,
    ],
    providers: [
        ResolucrdService,
        ResolucrdPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayResolucrdModule {}
