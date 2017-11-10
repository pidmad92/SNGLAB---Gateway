import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MotatenoficService,
    MotatenoficPopupService,
    MotatenoficComponent,
    MotatenoficDetailComponent,
    MotatenoficDialogComponent,
    MotatenoficPopupComponent,
    MotatenoficDeletePopupComponent,
    MotatenoficDeleteDialogComponent,
    motatenoficRoute,
    motatenoficPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motatenoficRoute,
    ...motatenoficPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MotatenoficComponent,
        MotatenoficDetailComponent,
        MotatenoficDialogComponent,
        MotatenoficDeleteDialogComponent,
        MotatenoficPopupComponent,
        MotatenoficDeletePopupComponent,
    ],
    entryComponents: [
        MotatenoficComponent,
        MotatenoficDialogComponent,
        MotatenoficPopupComponent,
        MotatenoficDeleteDialogComponent,
        MotatenoficDeletePopupComponent,
    ],
    providers: [
        MotatenoficService,
        MotatenoficPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMotatenoficModule {}
