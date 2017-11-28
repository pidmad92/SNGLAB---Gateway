import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../blocks/interceptor/http.provider';

import { GatewayExpedienteModule } from './expediente/expediente.module';
import { GatewayAplicacionModule } from './aplicacion/aplicacion.module';
import { GatewayModuloModule } from './modulo/modulo.module';
import { GatewayTipoUsuarioModule } from './tipo-usuario/tipo-usuario.module';
import { GatewayUsuarioModule } from './usuario/usuario.module';
import { GatewayUsuarioHorarioModule } from './usuario-horario/usuario-horario.module';
import { GatewayUsuarioGrupoModule } from './usuario-grupo/usuario-grupo.module';
import { GatewayTipoEntidadModule } from './tipo-entidad/tipo-entidad.module';
import { GatewayEntidadModule } from './entidad/entidad.module';
import { GatewayPermisoModule } from './permiso/permiso.module';
import { GatewayPerfilModule } from './perfil/perfil.module';
import { GatewayMenuModule } from './menu/menu.module';
import { GatewayGrupoModule } from './grupo/grupo.module';
import { GatewayUsuPerModule } from './usu-per/usu-per.module';
import { GatewayModuloEntidadModule } from './modulo-entidad/modulo-entidad.module';
import { GatewayMenuPerfilModule } from './menu-perfil/menu-perfil.module';
import { GatewayActiveconoModule } from './activecono/activecono.module';
import { GatewayAtencionModule } from './atencion/atencion.module';
import { GatewayAccionadopModule } from './accionadop/accionadop.module';
import { GatewayAtenaccadopModule } from './atenaccadop/atenaccadop.module';
import { GatewayAtendiscaModule } from './atendisca/atendisca.module';
import { GatewayAtenmotiatenModule } from './atenmotiaten/atenmotiaten.module';
import { GatewayDlabingpercModule } from './dlabingperc/dlabingperc.module';
import { GatewayDocpresentaModule } from './docpresenta/docpresenta.module';
import { GatewayPasemotiatenModule } from './pasemotiaten/pasemotiaten.module';
import { GatewayPerjuridireModule } from './perjuridire/perjuridire.module';
import { GatewayPernatudireModule } from './pernatudire/pernatudire.module';
import { GatewayCargotrabajaModule } from './cargotrabaja/cargotrabaja.module';
import { GatewayDatlaboralModule } from './datlaboral/datlaboral.module';
import { GatewayDiscapacidadModule } from './discapacidad/discapacidad.module';
import { GatewayDocingrepercModule } from './docingreperc/docingreperc.module';
import { GatewayDocumentoModule } from './documento/documento.module';
import { GatewayEmpleadorModule } from './empleador/empleador.module';
import { GatewayModacontratoModule } from './modacontrato/modacontrato.module';
import { GatewayMotivoatenciModule } from './motivoatenci/motivoatenci.module';
import { GatewayMotivoceseModule } from './motivocese/motivocese.module';
import { GatewayOficinaModule } from './oficina/oficina.module';
import { GatewayPaseModule } from './pase/pase.module';
import { GatewayPersonajuridModule } from './personajurid/personajurid.module';
import { GatewayPersonanaturModule } from './personanatur/personanatur.module';
import { GatewayDirecalterModule } from './direcalter/direcalter.module';
import { GatewayRegimenlaboModule } from './regimenlabo/regimenlabo.module';
import { GatewaySucesorModule } from './sucesor/sucesor.module';
import { GatewayTipatencionModule } from './tipatencion/tipatencion.module';
import { GatewayTipdocidentModule } from './tipdocident/tipdocident.module';
import { GatewayTipdocumentoModule } from './tipdocumento/tipdocumento.module';
import { GatewayTippersonaModule } from './tippersona/tippersona.module';
import { GatewayTrabajadorModule } from './trabajador/trabajador.module';
import { GatewayMotatenoficModule } from './motatenofic/motatenofic.module';
import { GatewaySubregilaboModule } from './subregilabo/subregilabo.module';
import { GatewayConciliacionModule } from './conciliacion/conciliacion.module';
import { GatewayDocexpedienModule } from './docexpedien/docexpedien.module';
import { GatewayMultaModule } from './multa/multa.module';
import { GatewayNotificacionModule } from './notificacion/notificacion.module';
import { GatewayResolucrdModule } from './resolucrd/resolucrd.module';
import { GatewayDirecnotifModule } from './direcnotif/direcnotif.module';
import { GatewayAbogadoModule } from './abogado/abogado.module';
import { GatewayDettipprovModule } from './dettipprov/dettipprov.module';
import { GatewayEstexpedienModule } from './estexpedien/estexpedien.module';
import { GatewayHoraModule } from './hora/hora.module';
import { GatewayResolutorModule } from './resolutor/resolutor.module';
import { GatewayResulconciModule } from './resulconci/resulconci.module';
import { GatewayTipdocexpModule } from './tipdocexp/tipdocexp.module';
import { GatewayTipenvnotModule } from './tipenvnot/tipenvnot.module';
import { GatewayTipnotifModule } from './tipnotif/tipnotif.module';
import { GatewayTipproveidModule } from './tipproveid/tipproveid.module';
import { GatewayTipresconcModule } from './tipresconc/tipresconc.module';
import { GatewayDlabingrpercModule } from './dlabingrperc/dlabingrperc.module';
import { GatewayTipmotatenModule } from './tipmotaten/tipmotaten.module';
import { GatewayTipvinculoModule } from './tipvinculo/tipvinculo.module';
import { GatewayAnexlaboralModule } from './anexlaboral/anexlaboral.module';
import { GatewayDireccionModule } from './direccion/direccion.module';
import { GatewayFormarchivoModule } from './formarchivo/formarchivo.module';
import { GatewayFormfinancModule } from './formfinanc/formfinanc.module';
import { GatewayFormperfilModule } from './formperfil/formperfil.module';
import { GatewayHechoinverModule } from './hechoinver/hechoinver.module';
import { GatewayNegocolectModule } from './negocolect/negocolect.module';
import { GatewayParticipaModule } from './participa/participa.module';
import { GatewayReporteresModule } from './reporteres/reporteres.module';
import { GatewayRespinformaModule } from './respinforma/respinforma.module';
import { GatewayResulnegocModule } from './resulnegoc/resulnegoc.module';
import { GatewaySolicformModule } from './solicform/solicform.module';
import { GatewaySolicitudModule } from './solicitud/solicitud.module';
import { GatewayUndnegocioModule } from './undnegocio/undnegocio.module';

import { GatewayActieconModule } from './actiecon/actiecon.module';
import { GatewayAccadoateModule } from './accadoate/accadoate.module';
import { GatewayDiscapateModule } from './discapate/discapate.module';
import { GatewayMotateselecModule } from './motateselec/motateselec.module';
import { GatewayDocinperdlbModule } from './docinperdlb/docinperdlb.module';
import { GatewayDocpresateModule } from './docpresate/docpresate.module';
import { GatewayMotivpaseModule } from './motivpase/motivpase.module';
import { GatewayDirperjuriModule } from './dirperjuri/dirperjuri.module';
import { GatewayDirpernatModule } from './dirpernat/dirpernat.module';
import { GatewayCartrabModule } from './cartrab/cartrab.module';
import { GatewayDatlabModule } from './datlab/datlab.module';
import { GatewayDiscapModule } from './discap/discap.module';
import { GatewayDocingrperModule } from './docingrper/docingrper.module';
import { GatewayModcontratoModule } from './modcontrato/modcontrato.module';
import { GatewayMotateModule } from './motate/motate.module';
import { GatewayMotceseModule } from './motcese/motcese.module';
import { GatewayPaseglModule } from './pasegl/pasegl.module';
import { GatewayPerjuridicaModule } from './perjuridica/perjuridica.module';
import { GatewayPernaturalModule } from './pernatural/pernatural.module';
import { GatewayRegimenlabModule } from './regimenlab/regimenlab.module';
import { GatewayTipdocModule } from './tipdoc/tipdoc.module';
import { GatewayBensocialModule } from './bensocial/bensocial.module';
import { GatewayCalbensocModule } from './calbensoc/calbensoc.module';
import { GatewayCalperiodoModule } from './calperiodo/calperiodo.module';
import { GatewaySegsaludModule } from './segsalud/segsalud.module';
import { GatewayCalrcmperiModule } from './calrcmperi/calrcmperi.module';
import { GatewayConcepremModule } from './conceprem/conceprem.module';
import { GatewayEstpericalModule } from './estperical/estperical.module';
import { GatewayInteresperiModule } from './interesperi/interesperi.module';
import { GatewayLiquidacionModule } from './liquidacion/liquidacion.module';
import { GatewayTipcalconreModule } from './tipcalconre/tipcalconre.module';
import { GatewayTipcalperiModule } from './tipcalperi/tipcalperi.module';
import { GatewayTipconremModule } from './tipconrem/tipconrem.module';
import { GatewayTipinteresModule } from './tipinteres/tipinteres.module';
import { GatewayConciliaModule } from './concilia/concilia.module';
import { GatewayMultaconciModule } from './multaconci/multaconci.module';
import { GatewayNotificaModule } from './notifica/notifica.module';
import { GatewayHoraconModule } from './horacon/horacon.module';
import { GatewayDenunteModule } from './denunte/denunte.module';
import { GatewayDirdenunModule } from './dirdenun/dirdenun.module';
import { GatewayTipzonaModule } from './tipzona/tipzona.module';
import { GatewayTipviaModule } from './tipvia/tipvia.module';
import { GatewayMotidenunModule } from './motidenun/motidenun.module';
import { GatewayDetmotdenModule } from './detmotden/detmotden.module';
import { GatewayDatdenuModule } from './datdenu/datdenu.module';
import { GatewayMotfinModule } from './motfin/motfin.module';
import { GatewayInfosoliModule } from './infosoli/infosoli.module';
import { GatewayCalificaModule } from './califica/califica.module';
import { GatewayCalidenuModule } from './calidenu/calidenu.module';
import { GatewayOridenuModule } from './oridenu/oridenu.module';
import { GatewayDenunciaModule } from './denuncia/denuncia.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayExpedienteModule,
        GatewayAplicacionModule,
        GatewayModuloModule,
        GatewayTipoUsuarioModule,
        GatewayUsuarioModule,
        GatewayUsuarioHorarioModule,
        GatewayUsuarioGrupoModule,
        GatewayTipoEntidadModule,
        GatewayEntidadModule,
        GatewayPermisoModule,
        GatewayPerfilModule,
        GatewayMenuModule,
        GatewayGrupoModule,
        GatewayUsuPerModule,
        GatewayModuloEntidadModule,
        GatewayMenuPerfilModule,
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
        GatewayConciliacionModule,
        GatewayDocexpedienModule,
        GatewayMultaModule,
        GatewayNotificacionModule,
        GatewayResolucrdModule,
        GatewayDirecnotifModule,
        GatewayAbogadoModule,
        GatewayDettipprovModule,
        GatewayEstexpedienModule,
        GatewayHoraModule,
        GatewayResolutorModule,
        GatewayResulconciModule,
        GatewayTipdocexpModule,
        GatewayTipenvnotModule,
        GatewayTipnotifModule,
        GatewayTipproveidModule,
        GatewayTipresconcModule,
        GatewayDlabingrpercModule,
        GatewayTipmotatenModule,
        GatewayTipvinculoModule,
        GatewayAnexlaboralModule,
        GatewayDireccionModule,
        GatewayFormarchivoModule,
        GatewayFormfinancModule,
        GatewayFormperfilModule,
        GatewayHechoinverModule,
        GatewayNegocolectModule,
        GatewayParticipaModule,
        GatewayReporteresModule,
        GatewayRespinformaModule,
        GatewayResulnegocModule,
        GatewaySolicformModule,
        GatewaySolicitudModule,
        GatewayUndnegocioModule,
        GatewayActieconModule,
        GatewayAccadoateModule,
        GatewayDiscapateModule,
        GatewayMotateselecModule,
        GatewayDocinperdlbModule,
        GatewayDocpresateModule,
        GatewayMotivpaseModule,
        GatewayDirperjuriModule,
        GatewayDirpernatModule,
        GatewayCartrabModule,
        GatewayDatlabModule,
        GatewayDiscapModule,
        GatewayDocingrperModule,
        GatewayModcontratoModule,
        GatewayMotateModule,
        GatewayMotceseModule,
        GatewayPaseglModule,
        GatewayPerjuridicaModule,
        GatewayPernaturalModule,
        GatewayRegimenlabModule,
        GatewayTipdocModule,
        GatewayBensocialModule,
        GatewayCalbensocModule,
        GatewayCalperiodoModule,
        GatewaySegsaludModule,
        GatewayCalrcmperiModule,
        GatewayConcepremModule,
        GatewayEstpericalModule,
        GatewayInteresperiModule,
        GatewayLiquidacionModule,
        GatewayTipcalconreModule,
        GatewayTipcalperiModule,
        GatewayTipconremModule,
        GatewayTipinteresModule,
        GatewayConciliaModule,
        GatewayMultaconciModule,
        GatewayNotificaModule,
        GatewayHoraconModule,
        GatewayDenunteModule,
        GatewayDirdenunModule,
        GatewayTipzonaModule,
        GatewayTipviaModule,
        GatewayMotidenunModule,
        GatewayDetmotdenModule,
        GatewayDatdenuModule,
        GatewayMotfinModule,
        GatewayInfosoliModule,
        GatewayCalificaModule,
        GatewayCalidenuModule,
        GatewayOridenuModule,
        GatewayDenunciaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
