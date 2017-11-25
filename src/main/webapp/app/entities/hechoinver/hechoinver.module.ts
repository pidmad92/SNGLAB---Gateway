import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    HechoinverService,
    HechoinverPopupService,
    HechoinverComponent,
    HechoinverDetailComponent,
    HechoinverDialogComponent,
    HechoinverPopupComponent,
    HechoinverDeletePopupComponent,
    HechoinverDeleteDialogComponent,
    hechoinverRoute,
    hechoinverPopupRoute,
} from './';

const ENTITY_STATES = [
    ...hechoinverRoute,
    ...hechoinverPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HechoinverComponent,
        HechoinverDetailComponent,
        HechoinverDialogComponent,
        HechoinverDeleteDialogComponent,
        HechoinverPopupComponent,
        HechoinverDeletePopupComponent,
    ],
    entryComponents: [
        HechoinverComponent,
        HechoinverDialogComponent,
        HechoinverPopupComponent,
        HechoinverDeleteDialogComponent,
        HechoinverDeletePopupComponent,
    ],
    providers: [
        HechoinverService,
        HechoinverPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHechoinverModule {}
