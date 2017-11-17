import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BienvenidatComponent } from './bienvenidat.component';

import { GatewaySharedModule } from '../../../shared';
import { BienvenidaService,
    BienvenidaComponent,
    BienvenidaRoute,
} from './';

const ENTITY_STATES = [
    ...BienvenidaRoute,
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BienvenidaComponent,
        BienvenidatComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        BienvenidaComponent,
        BienvenidatComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        BienvenidaService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BienvenidaModule {}
