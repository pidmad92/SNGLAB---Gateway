import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DirperjuriService,
    DirperjuriPopupService,
    DirperjuriComponent,
    DirperjuriDetailComponent,
    DirperjuriDialogComponent,
    DirperjuriPopupComponent,
    DirperjuriDeletePopupComponent,
    DirperjuriDeleteDialogComponent,
    dirperjuriRoute,
    dirperjuriPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dirperjuriRoute,
    ...dirperjuriPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DirperjuriComponent,
        DirperjuriDetailComponent,
        DirperjuriDialogComponent,
        DirperjuriDeleteDialogComponent,
        DirperjuriPopupComponent,
        DirperjuriDeletePopupComponent,
    ],
    entryComponents: [
        DirperjuriComponent,
        DirperjuriDialogComponent,
        DirperjuriPopupComponent,
        DirperjuriDeleteDialogComponent,
        DirperjuriDeletePopupComponent,
    ],
    providers: [
        DirperjuriService,
        DirperjuriPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDirperjuriModule {}
