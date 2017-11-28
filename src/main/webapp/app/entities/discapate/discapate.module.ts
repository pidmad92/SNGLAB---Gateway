import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DiscapateService,
    DiscapatePopupService,
    DiscapateComponent,
    DiscapateDetailComponent,
    DiscapateDialogComponent,
    DiscapatePopupComponent,
    DiscapateDeletePopupComponent,
    DiscapateDeleteDialogComponent,
    discapateRoute,
    discapatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...discapateRoute,
    ...discapatePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        // RouterModule.forRoot(ENTITY_STATES, { useHash: true })
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscapateComponent,
        DiscapateDetailComponent,
        DiscapateDialogComponent,
        DiscapateDeleteDialogComponent,
        DiscapatePopupComponent,
        DiscapateDeletePopupComponent,
    ],
    entryComponents: [
        DiscapateComponent,
        DiscapateDialogComponent,
        DiscapatePopupComponent,
        DiscapateDeleteDialogComponent,
        DiscapateDeletePopupComponent,
    ],
    providers: [
        DiscapateService,
        DiscapatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDiscapateModule {}
