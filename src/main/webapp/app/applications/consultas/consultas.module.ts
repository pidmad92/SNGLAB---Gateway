
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

// import { GatewayActiveconoModule } from '../../entities/activecono/activecono.module';
// import { GatewayAtencionModule } from '../../entities/atencion/atencion.module';
// import { GatewayAccionadopModule } from '../../entities/accionadop/accionadop.module';
// import { GatewayAtenaccadopModule } from '../../entities/atenaccadop/atenaccadop.module';
// import { GatewayAtendiscaModule } from '../../entities/atendisca/atendisca.module';
// import { GatewayAtenmotiatenModule } from '../../entities/atenmotiaten/atenmotiaten.module';
// import { GatewayDlabingpercModule } from '../../entities/dlabingperc/dlabingperc.module';
// import { GatewayDocpresentaModule } from '../../entities/docpresenta/docpresenta.module';
// import { GatewayPasemotiatenModule } from '../../entities/pasemotiaten/pasemotiaten.module';
// import { GatewayPerjuridireModule } from '../../entities/perjuridire/perjuridire.module';
// import { GatewayPernatudireModule } from '../../entities/pernatudire/pernatudire.module';
// import { GatewayCargotrabajaModule } from '../../entities/cargotrabaja/cargotrabaja.module';
// import { GatewayDatlaboralModule } from '../../entities/datlaboral/datlaboral.module';
// import { GatewayDiscapacidadModule } from '../../entities/discapacidad/discapacidad.module';
// import { GatewayDocingrepercModule } from '../../entities/docingreperc/docingreperc.module';
// import { GatewayDocumentoModule } from '../../entities/documento/documento.module';
// import { GatewayEmpleadorModule } from '../../entities/empleador/empleador.module';
// import { GatewayModacontratoModule } from '../../entities/modacontrato/modacontrato.module';
// import { GatewayMotivoatenciModule } from '../../entities/motivoatenci/motivoatenci.module';
// import { GatewayMotivoceseModule } from '../../entities/motivocese/motivocese.module';
// import { GatewayOficinaModule } from '../../entities/oficina/oficina.module';
// import { GatewayPaseModule } from '../../entities/pase/pase.module';
// import { GatewayPersonajuridModule } from '../../entities/personajurid/personajurid.module';
// import { GatewayPersonanaturModule } from '../../entities/personanatur/personanatur.module';
// import { GatewayDirecalterModule } from '../../entities/direcalter/direcalter.module';
// import { GatewayRegimenlaboModule } from '../../entities/regimenlabo/regimenlabo.module';
// import { GatewaySucesorModule } from '../../entities/sucesor/sucesor.module';
// import { GatewayTipatencionModule } from '../../entities/tipatencion/tipatencion.module';
// import { GatewayTipdocidentModule } from '../../entities/tipdocident/tipdocident.module';
// import { GatewayTipdocumentoModule } from '../../entities/tipdocumento/tipdocumento.module';
// import { GatewayTippersonaModule } from '../../entities/tippersona/tippersona.module';
// import { GatewayTrabajadorModule } from '../../entities/trabajador/trabajador.module';
// import { GatewayMotatenoficModule } from '../../entities/motatenofic/motatenofic.module';
// import { GatewaySubregilaboModule } from '../../entities/subregilabo/subregilabo.module';

// import { GatewayTipvinculoModule } from '../../entities/tipvinculo/tipvinculo.module';
// import { GatewayTippersonaModule } from '../../entities/tippersona/tippersona.module';
// import { GatewayTipmotatenModule } from '../../entities/tipmotaten/tipmotaten.module';
// import { GatewayTipdocidentModule } from '../../entities/tipdocident/tipdocident.module';
// import { GatewayTipdocModule } from '../../entities/tipdoc/tipdoc.module';
// import { GatewayTipatencionModule } from '../../entities/tipatencion/tipatencion.module';
// import { GatewaySucesorModule } from '../../entities/sucesor/sucesor.module';
// import { GatewayRegimenlabModule } from '../../entities/regimenlab/regimenlab.module';
// import { GatewayPernaturalModule } from '../../entities/pernatural/pernatural.module';
// import { GatewayPerjuridicaModule } from '../../entities/perjuridica/perjuridica.module';
// import { GatewayPaseglModule } from '../../entities/pasegl/pasegl.module';
// import { GatewayOficinaModule } from '../../entities/oficina/oficina.module';
// import { GatewayMotivpaseModule } from '../../entities/motivpase/motivpase.module';
// import { GatewayMotceseModule } from '../../entities/motcese/motcese.module';
// import { GatewayMotateselecModule } from '../../entities/motateselec/motateselec.module';
// import { GatewayMotatenoficModule } from '../../entities/motatenofic/motatenofic.module';
// import { GatewayMotateModule } from '../../entities/motate/motate.module';
// import { GatewayModcontratoModule } from '../../entities/modcontrato/modcontrato.module';
// import { GatewayEmpleadorModule } from '../../entities/empleador/empleador.module';
// import { GatewayDocumentoModule } from '../../entities/documento/documento.module';
// import { GatewayDocpresateModule } from '../../entities/docpresate/docpresate.module';
// import { GatewayDocinperdlbModule } from '../../entities/docinperdlb/docinperdlb.module';
// import { GatewayDocingrperModule } from '../../entities/docingrper/docingrper.module';
// import { GatewayDiscapateModule } from '../../entities/discapate/discapate.module';
// import { GatewayDiscapModule } from '../../entities/discap/discap.module';
// import { GatewayDirpernatModule } from '../../entities/dirpernat/dirpernat.module';
// import { GatewayDirperjuriModule } from '../../entities/dirperjuri/dirperjuri.module';
// import { GatewayDirecalterModule } from '../../entities/direcalter/direcalter.module';
// import { GatewayDatlabModule } from '../../entities/datlab/datlab.module';
// import { GatewayCartrabModule } from '../../entities/cartrab/cartrab.module';
// import { GatewayAtencionModule } from '../../entities/atencion/atencion.module';
// import { GatewayActieconModule } from '../../entities/actiecon/actiecon.module';
// import { GatewayAccionadopModule } from '../../entities/accionadop/accionadop.module';
// import { GatewayAccadoateModule } from '../../entities/accadoate/accadoate.module';
// import { GatewayTrabajadorModule } from '../../entities/trabajador/trabajador.module';

import { AtencionTrabajadorModule } from './atencion-trabajador/atencion-trabajador.module';
import { AtencionEmpleadorModule } from './atencion-empleador/atencion-empleador.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        // GatewayActiveconoModule,
        // GatewayAtencionModule,
        // GatewayAccionadopModule,
        // GatewayAtenaccadopModule,
        // GatewayAtendiscaModule,
        // GatewayAtenmotiatenModule,
        // GatewayDlabingpercModule,
        // GatewayDocpresentaModule,
        // GatewayPasemotiatenModule,
        // GatewayPerjuridireModule,
        // GatewayPernatudireModule,
        // GatewayCargotrabajaModule,
        // GatewayDatlaboralModule,
        // GatewayDiscapacidadModule,
        // GatewayDocingrepercModule,
        // GatewayDocumentoModule,
        // GatewayEmpleadorModule,
        // GatewayModacontratoModule,
        // GatewayMotivoatenciModule,
        // GatewayMotivoceseModule,
        // GatewayOficinaModule,
        // GatewayPaseModule,
        // GatewayPersonajuridModule,
        // GatewayPersonanaturModule,
        // GatewayDirecalterModule,
        // GatewayRegimenlaboModule,
        // GatewaySucesorModule,
        // GatewayTipatencionModule,
        // GatewayTipdocidentModule,
        // GatewayTipdocumentoModule,
        // GatewayTippersonaModule,
        // GatewayTrabajadorModule,
        // GatewayMotatenoficModule,
        // GatewaySubregilaboModule,
        // GatewayTipvinculoModule,
        // GatewayTippersonaModule,
        // GatewayTipmotatenModule,
        // GatewayTipdocidentModule,
        // GatewayTipdocModule,
        // GatewayTipatencionModule,
        // GatewaySucesorModule,
        // GatewayRegimenlabModule,
        // GatewayPernaturalModule,
        // GatewayPerjuridicaModule,
        // GatewayPaseglModule,
        // GatewayOficinaModule,
        // GatewayMotivpaseModule,
        // GatewayMotceseModule,
        // GatewayMotateselecModule,
        // GatewayMotatenoficModule,
        // GatewayMotateModule,
        // GatewayModcontratoModule,
        // GatewayEmpleadorModule,
        // GatewayDocumentoModule,
        // GatewayDocpresateModule,
        // GatewayDocinperdlbModule,
        // GatewayDocingrperModule,
        // GatewayDiscapateModule,
        // GatewayDiscapModule,
        // GatewayDirpernatModule,
        // GatewayDirperjuriModule,
        // GatewayDirecalterModule,
        // GatewayDatlabModule,
        // GatewayCartrabModule,
        // GatewayAtencionModule,
        // GatewayActieconModule,
        // GatewayAccionadopModule,
        // GatewayAccadoateModule,
        // GatewayTrabajadorModule,
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
