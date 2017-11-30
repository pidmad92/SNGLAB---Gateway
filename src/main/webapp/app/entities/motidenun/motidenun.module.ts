import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotidenunService,
    MotidenunPopupService,
    MotidenunComponent,
    MotidenunDetailComponent,
    MotidenunDialogComponent,
    MotidenunPopupComponent,
    MotidenunDeletePopupComponent,
    MotidenunDeleteDialogComponent,
    motidenunRoute,
    motidenunPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motidenunRoute,
    ...motidenunPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotidenunComponent,
        MotidenunDetailComponent,
        MotidenunDialogComponent,
        MotidenunDeleteDialogComponent,
        MotidenunPopupComponent,
        MotidenunDeletePopupComponent,
    ],
    entryComponents: [
        MotidenunComponent,
        MotidenunDialogComponent,
        MotidenunPopupComponent,
        MotidenunDeleteDialogComponent,
        MotidenunDeletePopupComponent,
    ],
    providers: [
        MotidenunService,
        MotidenunPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotidenunModule {}
