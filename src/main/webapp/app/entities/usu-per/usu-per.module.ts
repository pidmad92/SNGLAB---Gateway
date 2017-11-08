import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    UsuPerService,
    UsuPerPopupService,
    UsuPerComponent,
    UsuPerDetailComponent,
    UsuPerDialogComponent,
    UsuPerPopupComponent,
    UsuPerDeletePopupComponent,
    UsuPerDeleteDialogComponent,
    usuPerRoute,
    usuPerPopupRoute,
    UsuPerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuPerRoute,
    ...usuPerPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuPerComponent,
        UsuPerDetailComponent,
        UsuPerDialogComponent,
        UsuPerDeleteDialogComponent,
        UsuPerPopupComponent,
        UsuPerDeletePopupComponent,
    ],
    entryComponents: [
        UsuPerComponent,
        UsuPerDialogComponent,
        UsuPerPopupComponent,
        UsuPerDeleteDialogComponent,
        UsuPerDeletePopupComponent,
    ],
    providers: [
        UsuPerService,
        UsuPerPopupService,
        UsuPerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUsuPerModule {}
