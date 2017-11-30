import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ResulnegocService,
    ResulnegocPopupService,
    ResulnegocComponent,
    ResulnegocDetailComponent,
    ResulnegocDialogComponent,
    ResulnegocPopupComponent,
    ResulnegocDeletePopupComponent,
    ResulnegocDeleteDialogComponent,
    resulnegocRoute,
    resulnegocPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resulnegocRoute,
    ...resulnegocPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResulnegocComponent,
        ResulnegocDetailComponent,
        ResulnegocDialogComponent,
        ResulnegocDeleteDialogComponent,
        ResulnegocPopupComponent,
        ResulnegocDeletePopupComponent,
    ],
    entryComponents: [
        ResulnegocComponent,
        ResulnegocDialogComponent,
        ResulnegocPopupComponent,
        ResulnegocDeleteDialogComponent,
        ResulnegocDeletePopupComponent,
    ],
    providers: [
        ResulnegocService,
        ResulnegocPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayResulnegocModule {}
