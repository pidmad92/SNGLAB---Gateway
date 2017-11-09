import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/primeng';

import { GatewaySharedModule } from '../../../shared';
import { DatosTrabajadorComponent } from './atencion-trabajador-wizard/datos-trabajador.component';
import { MotivosConsultaComponent } from './atencion-trabajador-wizard/motivos-consulta.component';
import { AtencionTrabajadorService,
    AtencionTrabajadorComponent,
    AtencionTrabajadorWizardComponent,
    atencionTrabajadorRoute,
    accionadopPopupRoute
} from './';

const ENTITY_STATES = [
    ...atencionTrabajadorRoute,
    ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        StepsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtencionTrabajadorComponent,
        AtencionTrabajadorWizardComponent,
        DatosTrabajadorComponent,
        MotivosConsultaComponent,
        // AccionadopDetailComponent,
        // AccionadopDialogComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeletePopupComponent,
    ],
    entryComponents: [
        AtencionTrabajadorComponent,
        AtencionTrabajadorWizardComponent,
        DatosTrabajadorComponent,
        MotivosConsultaComponent,
        // AccionadopDialogComponent,
        // AccionadopPopupComponent,
        // AccionadopDeleteDialogComponent,
        // AccionadopDeletePopupComponent,
    ],
    providers: [
        AtencionTrabajadorService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtencionTrabajadorModule {}
