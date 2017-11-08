import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MenuService,
    MenuPopupService,
    MenuComponent,
    MenuDetailComponent,
    MenuDialogComponent,
    MenuPopupComponent,
    MenuDeletePopupComponent,
    MenuDeleteDialogComponent,
    menuRoute,
    menuPopupRoute,
    MenuResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...menuRoute,
    ...menuPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MenuComponent,
        MenuDetailComponent,
        MenuDialogComponent,
        MenuDeleteDialogComponent,
        MenuPopupComponent,
        MenuDeletePopupComponent,
    ],
    entryComponents: [
        MenuComponent,
        MenuDialogComponent,
        MenuPopupComponent,
        MenuDeleteDialogComponent,
        MenuDeletePopupComponent,
    ],
    providers: [
        MenuService,
        MenuPopupService,
        MenuResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMenuModule {}
