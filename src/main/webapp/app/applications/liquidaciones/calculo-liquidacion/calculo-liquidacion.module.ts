import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

import { CalculoLiquidacionRoute } from './calculo-liquidacion.route';

import { CtsComponent } from './cts/cts.component';
import { GratificacionesComponent } from './gratificaciones/gratificaciones.component';
import { IndemnizacionesComponent } from './indemnizaciones/indemnizaciones.component';
import { RemuneracionesInsolutasComponent } from './remuneraciones-insolutas/remuneraciones-insolutas.component';
import { ResumenComponent } from './resumen/resumen.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';

const ENTITY_STATES = [
    ...CalculoLiquidacionRoute
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CtsComponent,
        GratificacionesComponent,
        IndemnizacionesComponent,
        RemuneracionesInsolutasComponent,
        ResumenComponent,
        VacacionesComponent
    ],
    entryComponents: [
    ],
    providers: [
        MessageService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalculoLiquidacionModule { }
