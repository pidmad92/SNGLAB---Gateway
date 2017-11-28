import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ReporteresService,
    ReporteresPopupService,
    ReporteresComponent,
    ReporteresDetailComponent,
    ReporteresDialogComponent,
    ReporteresPopupComponent,
    ReporteresDeletePopupComponent,
    ReporteresDeleteDialogComponent,
    reporteresRoute,
    reporteresPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reporteresRoute,
    ...reporteresPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReporteresComponent,
        ReporteresDetailComponent,
        ReporteresDialogComponent,
        ReporteresDeleteDialogComponent,
        ReporteresPopupComponent,
        ReporteresDeletePopupComponent,
    ],
    entryComponents: [
        ReporteresComponent,
        ReporteresDialogComponent,
        ReporteresPopupComponent,
        ReporteresDeleteDialogComponent,
        ReporteresDeletePopupComponent,
    ],
    providers: [
        ReporteresService,
        ReporteresPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayReporteresModule {}
