
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { GatewayActiveconoModule } from '../../entities/activecono/activecono.module';
import { GatewayAtencionModule } from '../../entities/atencion/atencion.module';
import { GatewayAccionadopModule } from '../../entities/accionadop/accionadop.module';
import { GatewayAtenaccadopModule } from '../../entities/atenaccadop/atenaccadop.module';
import { GatewayAtendiscaModule } from '../../entities/atendisca/atendisca.module';
import { GatewayAtenmotiatenModule } from '../../entities/atenmotiaten/atenmotiaten.module';
import { GatewayDlabingpercModule } from '../../entities/dlabingperc/dlabingperc.module';
import { GatewayDocpresentaModule } from '../../entities/docpresenta/docpresenta.module';
import { GatewayPasemotiatenModule } from '../../entities/pasemotiaten/pasemotiaten.module';
import { GatewayPerjuridireModule } from '../../entities/perjuridire/perjuridire.module';
import { GatewayPernatudireModule } from '../../entities/pernatudire/pernatudire.module';
import { GatewayCargotrabajaModule } from '../../entities/cargotrabaja/cargotrabaja.module';
import { GatewayDatlaboralModule } from '../../entities/datlaboral/datlaboral.module';
import { GatewayDiscapacidadModule } from '../../entities/discapacidad/discapacidad.module';
import { GatewayDocingrepercModule } from '../../entities/docingreperc/docingreperc.module';
import { GatewayDocumentoModule } from '../../entities/documento/documento.module';
import { GatewayEmpleadorModule } from '../../entities/empleador/empleador.module';
import { GatewayModacontratoModule } from '../../entities/modacontrato/modacontrato.module';
import { GatewayMotivoatenciModule } from '../../entities/motivoatenci/motivoatenci.module';
import { GatewayMotivoceseModule } from '../../entities/motivocese/motivocese.module';
import { GatewayOficinaModule } from '../../entities/oficina/oficina.module';
import { GatewayPaseModule } from '../../entities/pase/pase.module';
import { GatewayPersonajuridModule } from '../../entities/personajurid/personajurid.module';
import { GatewayPersonanaturModule } from '../../entities/personanatur/personanatur.module';
import { GatewayDirecalterModule } from '../../entities/direcalter/direcalter.module';
import { GatewayRegimenlaboModule } from '../../entities/regimenlabo/regimenlabo.module';
import { GatewaySucesorModule } from '../../entities/sucesor/sucesor.module';
import { GatewayTipatencionModule } from '../../entities/tipatencion/tipatencion.module';
import { GatewayTipdocidentModule } from '../../entities/tipdocident/tipdocident.module';
import { GatewayTipdocumentoModule } from '../../entities/tipdocumento/tipdocumento.module';
import { GatewayTippersonaModule } from '../../entities/tippersona/tippersona.module';
import { GatewayTrabajadorModule } from '../../entities/trabajador/trabajador.module';
import { GatewayMotatenoficModule } from '../../entities/motatenofic/motatenofic.module';
import { GatewaySubregilaboModule } from '../../entities/subregilabo/subregilabo.module';

import { AtencionTrabajadorModule } from './atencion-trabajador/atencion-trabajador.module';
import { AtencionEmpleadorModule } from './atencion-empleador/atencion-empleador.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayActiveconoModule,
        GatewayAtencionModule,
        GatewayAccionadopModule,
        GatewayAtenaccadopModule,
        GatewayAtendiscaModule,
        GatewayAtenmotiatenModule,
        GatewayDlabingpercModule,
        GatewayDocpresentaModule,
        GatewayPasemotiatenModule,
        GatewayPerjuridireModule,
        GatewayPernatudireModule,
        GatewayCargotrabajaModule,
        GatewayDatlaboralModule,
        GatewayDiscapacidadModule,
        GatewayDocingrepercModule,
        GatewayDocumentoModule,
        GatewayEmpleadorModule,
        GatewayModacontratoModule,
        GatewayMotivoatenciModule,
        GatewayMotivoceseModule,
        GatewayOficinaModule,
        GatewayPaseModule,
        GatewayPersonajuridModule,
        GatewayPersonanaturModule,
        GatewayDirecalterModule,
        GatewayRegimenlaboModule,
        GatewaySucesorModule,
        GatewayTipatencionModule,
        GatewayTipdocidentModule,
        GatewayTipdocumentoModule,
        GatewayTippersonaModule,
        GatewayTrabajadorModule,
        GatewayMotatenoficModule,
        GatewaySubregilaboModule,
        AtencionTrabajadorModule,
        AtencionEmpleadorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConsultasModule {}
