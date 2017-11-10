import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PersonanaturService,
    PersonanaturPopupService,
    PersonanaturComponent,
    PersonanaturDetailComponent,
    PersonanaturDialogComponent,
    PersonanaturPopupComponent,
    PersonanaturDeletePopupComponent,
    PersonanaturDeleteDialogComponent,
    personanaturRoute,
    personanaturPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personanaturRoute,
    ...personanaturPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonanaturComponent,
        PersonanaturDetailComponent,
        PersonanaturDialogComponent,
        PersonanaturDeleteDialogComponent,
        PersonanaturPopupComponent,
        PersonanaturDeletePopupComponent,
    ],
    entryComponents: [
        PersonanaturComponent,
        PersonanaturDialogComponent,
        PersonanaturPopupComponent,
        PersonanaturDeleteDialogComponent,
        PersonanaturDeletePopupComponent,
    ],
    providers: [
        PersonanaturService,
        PersonanaturPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPersonanaturModule {}
