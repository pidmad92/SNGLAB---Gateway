import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../blocks/interceptor/http.provider';

import { GatewayTipvinculoModule } from './tipvinculo/tipvinculo.module';
import { GatewayTippersonaModule } from './tippersona/tippersona.module';
import { GatewayTipmotatenModule } from './tipmotaten/tipmotaten.module';
import { GatewayTipdocidentModule } from './tipdocident/tipdocident.module';
import { GatewayTipdocModule } from './tipdoc/tipdoc.module';
import { GatewayTipatencionModule } from './tipatencion/tipatencion.module';
import { GatewaySucesorModule } from './sucesor/sucesor.module';
import { GatewayRegimenlabModule } from './regimenlab/regimenlab.module';
import { GatewayPernaturalModule } from './pernatural/pernatural.module';
import { GatewayPerjuridicaModule } from './perjuridica/perjuridica.module';
import { GatewayPaseglModule } from './pasegl/pasegl.module';
import { GatewayOficinaModule } from './oficina/oficina.module';
import { GatewayMotivpaseModule } from './motivpase/motivpase.module';
import { GatewayMotceseModule } from './motcese/motcese.module';
import { GatewayMotateselecModule } from './motateselec/motateselec.module';
import { GatewayMotatenoficModule } from './motatenofic/motatenofic.module';
import { GatewayMotateModule } from './motate/motate.module';
import { GatewayModcontratoModule } from './modcontrato/modcontrato.module';
import { GatewayEmpleadorModule } from './empleador/empleador.module';
import { GatewayDocumentoModule } from './documento/documento.module';
import { GatewayDocpresateModule } from './docpresate/docpresate.module';
import { GatewayDocinperdlbModule } from './docinperdlb/docinperdlb.module';
import { GatewayDocingrperModule } from './docingrper/docingrper.module';
import { GatewayDiscapateModule } from './discapate/discapate.module';
import { GatewayDiscapModule } from './discap/discap.module';
import { GatewayDirpernatModule } from './dirpernat/dirpernat.module';
import { GatewayDirperjuriModule } from './dirperjuri/dirperjuri.module';
import { GatewayDirecalterModule } from './direcalter/direcalter.module';
import { GatewayDatlabModule } from './datlab/datlab.module';
import { GatewayCartrabModule } from './cartrab/cartrab.module';
import { GatewayAtencionModule } from './atencion/atencion.module';
import { GatewayActieconModule } from './actiecon/actiecon.module';
import { GatewayAccionadopModule } from './accionadop/accionadop.module';
import { GatewayAccadoateModule } from './accadoate/accadoate.module';
import { GatewayTrabajadorModule } from './trabajador/trabajador.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayTipvinculoModule,
        GatewayTippersonaModule,
        GatewayTipmotatenModule,
        GatewayTipdocidentModule,
        GatewayTipdocModule,
        GatewayTipatencionModule,
        GatewaySucesorModule,
        GatewayRegimenlabModule,
        GatewayPernaturalModule,
        GatewayPerjuridicaModule,
        GatewayPaseglModule,
        GatewayOficinaModule,
        GatewayMotivpaseModule,
        GatewayMotceseModule,
        GatewayMotateselecModule,
        GatewayMotatenoficModule,
        GatewayMotateModule,
        GatewayModcontratoModule,
        GatewayEmpleadorModule,
        GatewayDocumentoModule,
        GatewayDocpresateModule,
        GatewayDocinperdlbModule,
        GatewayDocingrperModule,
        GatewayDiscapateModule,
        GatewayDiscapModule,
        GatewayDirpernatModule,
        GatewayDirperjuriModule,
        GatewayDirecalterModule,
        GatewayDatlabModule,
        GatewayCartrabModule,
        GatewayAtencionModule,
        GatewayActieconModule,
        GatewayAccionadopModule,
        GatewayAccadoateModule,
        GatewayTrabajadorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasModule {}

// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { customHttpProvider } from '../blocks/interceptor/http.provider';

// import { GatewayActiveconoModule } from './activecono/activecono.module';
// import { GatewayAtencionModule } from './atencion/atencion.module';
// import { GatewayAccionadopModule } from './accionadop/accionadop.module';
// import { GatewayAtenaccadopModule } from './atenaccadop/atenaccadop.module';
// import { GatewayAtendiscaModule } from './atendisca/atendisca.module';
// import { GatewayAtenmotiatenModule } from './atenmotiaten/atenmotiaten.module';
// import { GatewayDlabingpercModule } from './dlabingperc/dlabingperc.module';
// import { GatewayDocpresentaModule } from './docpresenta/docpresenta.module';
// import { GatewayPasemotiatenModule } from './pasemotiaten/pasemotiaten.module';
// import { GatewayPerjuridireModule } from './perjuridire/perjuridire.module';
// import { GatewayPernatudireModule } from './pernatudire/pernatudire.module';
// import { GatewayCargotrabajaModule } from './cargotrabaja/cargotrabaja.module';
// import { GatewayDatlaboralModule } from './datlaboral/datlaboral.module';
// import { GatewayDiscapacidadModule } from './discapacidad/discapacidad.module';
// import { GatewayDocingrepercModule } from './docingreperc/docingreperc.module';
// import { GatewayDocumentoModule } from './documento/documento.module';
// import { GatewayEmpleadorModule } from './empleador/empleador.module';
// import { GatewayModacontratoModule } from './modacontrato/modacontrato.module';
// import { GatewayMotivoatenciModule } from './motivoatenci/motivoatenci.module';
// import { GatewayMotivoceseModule } from './motivocese/motivocese.module';
// import { GatewayOficinaModule } from './oficina/oficina.module';
// import { GatewayPaseModule } from './pase/pase.module';
// import { GatewayPersonajuridModule } from './personajurid/personajurid.module';
// import { GatewayPersonanaturModule } from './personanatur/personanatur.module';
// import { GatewayDirecalterModule } from './direcalter/direcalter.module';
// import { GatewayRegimenlaboModule } from './regimenlabo/regimenlabo.module';
// import { GatewaySucesorModule } from './sucesor/sucesor.module';
// import { GatewayTipatencionModule } from './tipatencion/tipatencion.module';
// import { GatewayTipdocidentModule } from './tipdocident/tipdocident.module';
// import { GatewayTipdocumentoModule } from './tipdocumento/tipdocumento.module';
// import { GatewayTippersonaModule } from './tippersona/tippersona.module';
// import { GatewayTrabajadorModule } from './trabajador/trabajador.module';
// import { GatewayMotatenoficModule } from './motatenofic/motatenofic.module';
// import { GatewaySubregilaboModule } from './subregilabo/subregilabo.module';
// /* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

// @NgModule({
//     imports: [
//         GatewayActiveconoModule,
//         GatewayAtencionModule,
//         GatewayAccionadopModule,
//         GatewayAtenaccadopModule,
//         GatewayAtendiscaModule,
//         GatewayAtenmotiatenModule,
//         GatewayDlabingpercModule,
//         GatewayDocpresentaModule,
//         GatewayPasemotiatenModule,
//         GatewayPerjuridireModule,
//         GatewayPernatudireModule,
//         GatewayCargotrabajaModule,
//         GatewayDatlaboralModule,
//         GatewayDiscapacidadModule,
//         GatewayDocingrepercModule,
//         GatewayDocumentoModule,
//         GatewayEmpleadorModule,
//         GatewayModacontratoModule,
//         GatewayMotivoatenciModule,
//         GatewayMotivoceseModule,
//         GatewayOficinaModule,
//         GatewayPaseModule,
//         GatewayPersonajuridModule,
//         GatewayPersonanaturModule,
//         GatewayDirecalterModule,
//         GatewayRegimenlaboModule,
//         GatewaySucesorModule,
//         GatewayTipatencionModule,
//         GatewayTipdocidentModule,
//         GatewayTipdocumentoModule,
//         GatewayTippersonaModule,
//         GatewayTrabajadorModule,
//         GatewayMotatenoficModule,
//         GatewaySubregilaboModule,
//         /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
//     ],
//     declarations: [],
//     entryComponents: [],
//     providers: [customHttpProvider()],
//     schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class ConsultasModule {}
