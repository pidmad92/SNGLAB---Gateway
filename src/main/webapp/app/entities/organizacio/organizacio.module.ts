import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    OrganizacioService,
    OrganizacioPopupService,
    OrganizacioComponent,
    OrganizacioDetailComponent,
    OrganizacioDialogComponent,
    OrganizacioPopupComponent,
    OrganizacioDeletePopupComponent,
    OrganizacioDeleteDialogComponent,
    organizacioRoute,
    organizacioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...organizacioRoute,
    ...organizacioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganizacioComponent,
        OrganizacioDetailComponent,
        OrganizacioDialogComponent,
        OrganizacioDeleteDialogComponent,
        OrganizacioPopupComponent,
        OrganizacioDeletePopupComponent,
    ],
    entryComponents: [
        OrganizacioComponent,
        OrganizacioDialogComponent,
        OrganizacioPopupComponent,
        OrganizacioDeleteDialogComponent,
        OrganizacioDeletePopupComponent,
    ],
    providers: [
        OrganizacioService,
        OrganizacioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOrganizacioModule {}
