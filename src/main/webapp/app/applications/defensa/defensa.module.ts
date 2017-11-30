import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { GatewayConciliacionModule } from '../../entities/conciliacion/conciliacion.module';
import { GatewayDocexpedienModule } from '../../entities/docexpedien/docexpedien.module';
import { GatewayMultaModule } from '../../entities/multa/multa.module';
import { GatewayNotificacionModule } from '../../entities/notificacion/notificacion.module';
import { GatewayResolucrdModule } from '../../entities/resolucrd/resolucrd.module';
import { GatewayDirecnotifModule } from '../../entities/direcnotif/direcnotif.module';
import { GatewayAbogadoModule } from '../../entities/abogado/abogado.module';
import { GatewayDettipprovModule } from '../../entities/dettipprov/dettipprov.module';
import { GatewayEstexpedienModule } from '../../entities/estexpedien/estexpedien.module';
import { GatewayHoraModule } from '../../entities/hora/hora.module';
import { GatewayResolutorModule } from '../../entities/resolutor/resolutor.module';
import { GatewayResulconciModule } from '../../entities/resulconci/resulconci.module';
import { GatewayTipdocexpModule } from '../../entities/tipdocexp/tipdocexp.module';
import { GatewayTipenvnotModule } from '../../entities/tipenvnot/tipenvnot.module';
import { GatewayTipnotifModule } from '../../entities/tipnotif/tipnotif.module';
import { GatewayTipproveidModule } from '../../entities/tipproveid/tipproveid.module';
import { GatewayTipresconcModule } from '../../entities/tipresconc/tipresconc.module';

import { RegistroExpedienteModule } from './registro-expediente/registro-expediente.module';
import { EnvioNotificacionModule } from './envio-notificacion/envio-notificacion.module';
import { ConsultaExpedienteModule } from './consulta-expedientes/consulta-expediente.module';
import { ConsultaNotificacionesModule } from './consulta-notificaciones/consulta-notificaciones.module';
import { AudienciaModule } from './audiencias/audiencia.module';
import { ReporteModule } from './reportes/reporte.module';
import { MantenimientoModule } from './mantenimientos/mantenimiento.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        // GatewayConciliacionModule,
        // GatewayDocexpedienModule,
        // GatewayMultaModule,
        // GatewayNotificacionModule,
        // GatewayResolucrdModule,
        // GatewayDirecnotifModule,
        // GatewayAbogadoModule,
        // GatewayDettipprovModule,
        // GatewayEstexpedienModule,
        // GatewayHoraModule,
        // GatewayResolutorModule,
        // GatewayResulconciModule,
        // GatewayTipdocexpModule,
        // GatewayTipenvnotModule,
        // GatewayTipnotifModule,
        // GatewayTipproveidModule,
        // GatewayTipresconcModule,
        RegistroExpedienteModule,
        EnvioNotificacionModule,
        ConsultaExpedienteModule,
        ConsultaNotificacionesModule,
        AudienciaModule,
        ReporteModule,
        MantenimientoModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDefensaModule {}
