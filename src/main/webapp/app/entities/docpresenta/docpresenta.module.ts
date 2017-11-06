import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DocpresentaService,
    DocpresentaPopupService,
    DocpresentaComponent,
    DocpresentaDetailComponent,
    DocpresentaDialogComponent,
    DocpresentaPopupComponent,
    DocpresentaDeletePopupComponent,
    DocpresentaDeleteDialogComponent,
    docpresentaRoute,
    docpresentaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...docpresentaRoute,
    ...docpresentaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DocpresentaComponent,
        DocpresentaDetailComponent,
        DocpresentaDialogComponent,
        DocpresentaDeleteDialogComponent,
        DocpresentaPopupComponent,
        DocpresentaDeletePopupComponent,
    ],
    entryComponents: [
        DocpresentaComponent,
        DocpresentaDialogComponent,
        DocpresentaPopupComponent,
        DocpresentaDeleteDialogComponent,
        DocpresentaDeletePopupComponent,
    ],
    providers: [
        DocpresentaService,
        DocpresentaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDocpresentaModule {}
