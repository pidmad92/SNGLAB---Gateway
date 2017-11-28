import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    MateriaService,
    MateriaPopupService,
    MateriaComponent,
    MateriaDetailComponent,
    MateriaDialogComponent,
    MateriaPopupComponent,
    MateriaDeletePopupComponent,
    MateriaDeleteDialogComponent,
    materiaRoute,
    materiaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...materiaRoute,
    ...materiaPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MateriaComponent,
        MateriaDetailComponent,
        MateriaDialogComponent,
        MateriaDeleteDialogComponent,
        MateriaPopupComponent,
        MateriaDeletePopupComponent,
    ],
    entryComponents: [
        MateriaComponent,
        MateriaDialogComponent,
        MateriaPopupComponent,
        MateriaDeleteDialogComponent,
        MateriaDeletePopupComponent,
    ],
    providers: [
        MateriaService,
        MateriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMateriaModule {}
