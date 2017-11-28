import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DirdenunService,
    DirdenunPopupService,
    DirdenunComponent,
    DirdenunDetailComponent,
    DirdenunDialogComponent,
    DirdenunPopupComponent,
    DirdenunDeletePopupComponent,
    DirdenunDeleteDialogComponent,
    dirdenunRoute,
    dirdenunPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dirdenunRoute,
    ...dirdenunPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DirdenunComponent,
        DirdenunDetailComponent,
        DirdenunDialogComponent,
        DirdenunDeleteDialogComponent,
        DirdenunPopupComponent,
        DirdenunDeletePopupComponent,
    ],
    entryComponents: [
        DirdenunComponent,
        DirdenunDialogComponent,
        DirdenunPopupComponent,
        DirdenunDeleteDialogComponent,
        DirdenunDeletePopupComponent,
    ],
    providers: [
        DirdenunService,
        DirdenunPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDirdenunModule {}
