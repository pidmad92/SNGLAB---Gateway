import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    UndnegocioService,
    UndnegocioPopupService,
    UndnegocioComponent,
    UndnegocioDetailComponent,
    UndnegocioDialogComponent,
    UndnegocioPopupComponent,
    UndnegocioDeletePopupComponent,
    UndnegocioDeleteDialogComponent,
    undnegocioRoute,
    undnegocioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...undnegocioRoute,
    ...undnegocioPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UndnegocioComponent,
        UndnegocioDetailComponent,
        UndnegocioDialogComponent,
        UndnegocioDeleteDialogComponent,
        UndnegocioPopupComponent,
        UndnegocioDeletePopupComponent,
    ],
    entryComponents: [
        UndnegocioComponent,
        UndnegocioDialogComponent,
        UndnegocioPopupComponent,
        UndnegocioDeleteDialogComponent,
        UndnegocioDeletePopupComponent,
    ],
    providers: [
        UndnegocioService,
        UndnegocioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUndnegocioModule {}
