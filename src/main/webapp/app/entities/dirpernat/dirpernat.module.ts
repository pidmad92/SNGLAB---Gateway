import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DirpernatService,
    DirpernatPopupService,
    DirpernatComponent,
    DirpernatDetailComponent,
    DirpernatDialogComponent,
    DirpernatPopupComponent,
    DirpernatDeletePopupComponent,
    DirpernatDeleteDialogComponent,
    dirpernatRoute,
    dirpernatPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dirpernatRoute,
    ...dirpernatPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DirpernatComponent,
        DirpernatDetailComponent,
        DirpernatDialogComponent,
        DirpernatDeleteDialogComponent,
        DirpernatPopupComponent,
        DirpernatDeletePopupComponent,
    ],
    entryComponents: [
        DirpernatComponent,
        DirpernatDialogComponent,
        DirpernatPopupComponent,
        DirpernatDeleteDialogComponent,
        DirpernatDeletePopupComponent,
    ],
    providers: [
        DirpernatService,
        DirpernatPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDirpernatModule {}
