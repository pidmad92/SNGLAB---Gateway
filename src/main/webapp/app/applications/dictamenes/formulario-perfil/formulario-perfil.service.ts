import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { Persona } from '../../general/servicesmodel/persona.model';
import { CarnetExtranjeria } from '../../general/servicesmodel/carnetextranjeria.model';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Message } from 'primeng/components/common/message';
import { Solicitud } from '../../../entities/solicitud/index';
import { Solicform } from '../../../entities/solicform/index';
import { DatePipe } from '@angular/common';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { ParticipaService, Participa } from '../../../entities/participa/index';
import { Direccion, DireccionService } from '../../../entities/direccion/index';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { Tipdocident } from '../../../entities/tipdocident/index';
import { ComboModel } from '../../general/combobox.model';
import { Formulario } from './formulario.model';
import { Anexlaboral, AnexlaboralService } from '../../../entities/anexlaboral/index';
import { PerreglabService, Perreglab } from '../../../entities/perreglab/index';
import { PerreglabId } from '../../../entities/perreglab/perreglabId.model';

@Injectable()
export class FormularioPerfilService {

    private resourceSunatUrl = '/api/sunat';
    private resourceReniecUrl = '/api/reniec';
    private resourceMigracionUrl = '/api/migracion';
    private resourceDepa = '/api/departamentos';
    private resourceProv = '/api/provincias';
    private resourceDist = '/api/distritos';
    private resourceTipoDoc = '/api/tipdocidents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    obtenerDatosGenerales(ruc: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceSunatUrl}/${ruc}`).map(
            (res: Response) => this.convertResponse(res, 1));

    }

    obtenerDatosReniec(dni: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceReniecUrl}/${dni}`).map(
            (res: Response) => this.convertResponse(res, 2));

    }

    obtenerDatosMigracion(carnet: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceMigracionUrl}/${carnet}`).map(
            (res: Response) => this.convertResponse(res, 2));

    }

    private convertResponse(res: Response, tipo: number): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        if (tipo === 1) {
            result.push(this.convertItemFromServerSunat(res.json()));
        } else if (tipo === 2) {
            result.push(this.convertItemFromServerReniec(res.json()));
        } else if (tipo === 3) {
            result.push(this.convertItemFromServerMigracion(res.json()));
        } else {
            // Pasaporte
            result.push(this.convertItemFromServerSunat(res.json()));
        }

        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Atenaccadop.
     */
    private convertItemFromServerSunat(json: any): Empresa {
        const entity: Empresa = Object.assign(new Empresa(), json);
        return entity;
    }

    private convertItemFromServerReniec(json: any): Persona {
        const entity: Persona = Object.assign(new Persona(), json);
        return entity;
    }

    private convertItemFromServerMigracion(json: any): CarnetExtranjeria {
        const entity: CarnetExtranjeria = Object.assign(new CarnetExtranjeria(), json);
        return entity;
    }

    guardarFormularioPerfil(datepipe: DatePipe,
        solicitud: Solicitud,
        solicForm: Solicform,
        formPerfil: Formperfil,
        undNegocios: Undnegocio[],
        participacionesAccionarias: Participa[],
        participacionesMercados: Participa[],
        obras: Hechoinver[],
        proyectos: Hechoinver[],
        direcciones: Direccion[],
        organizaciones: Negocolect[],
        solicitante: Negocolect,
        resultadoNegociaciones: Resulnegoc[],
        responInfoFinanciera: Respinforma,
        responeInfoLaboral: Respinforma,
        formulario: Formulario[],
        selectedRegimen: ComboModel[],
        formPerfilService: FormperfilService,
        undNegocioservice: UndnegocioService,
        participaService: ParticipaService,
        hechoinverService: HechoinverService,
        direccionService: DireccionService,
        negocolectService: NegocolectService,
        resulnegocService: ResulnegocService,
        respinformaService: RespinformaService,
        anexlaboralService: AnexlaboralService,
        perreglabService: PerreglabService) {
        const vUsua = 'CODUSU';
        const nSede = 0;
        // Guardar Formulario Perfil
        if (formPerfil !== undefined && formPerfil !== null) {

            formPerfil.tFecreg = datepipe.transform((formPerfil.tFecreg), 'yyyy-MM-dd HH:mm:ss')
            formPerfil.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
            formPerfil.vUsuaupd = vUsua;
            formPerfil.nSedeupd = nSede;
            formPerfil.nFlgactivo = true;

            formPerfilService.update(formPerfil).subscribe(
                (obj) => formPerfil = obj,
            );
        }
        // Guardar Unidades de Negocio
        if (undNegocios !== undefined && undNegocios !== null) {
            if (undNegocios.length > 0) {
                undNegocioservice.eliminar(formPerfil.nCodfperf).subscribe();
                for (let i = 0; i < undNegocios.length; i++) {
                    undNegocios[i].nCodfperf = formPerfil.nCodfperf;
                    if (undNegocios[i].nCodundng !== undefined && undNegocios[i].nCodundng !== null) {
                        undNegocios[i].tFecreg = datepipe.transform((undNegocios[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        undNegocios[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        undNegocios[i].vUsuaupd = vUsua;
                        undNegocios[i].nSedeupd = nSede;
                        undNegocios[i].nFlgactivo = true;
                        undNegocioservice.update(undNegocios[i]).subscribe(
                            (undNegocio) => undNegocios[i] = undNegocio,
                        );
                    } else {
                        undNegocios[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        undNegocios[i].vUsuareg = vUsua;
                        undNegocios[i].nSedereg = nSede;
                        undNegocios[i].nFlgactivo = true;
                        undNegocioservice.create(undNegocios[i]).subscribe(
                            (undNegocio) => undNegocios[i] = undNegocio,
                        );
                    }
                }
            }
        }
        participaService.eliminar(formPerfil.nCodfperf).subscribe();
        // Guardar Participaciones Accionarias
        if (participacionesAccionarias !== undefined && participacionesAccionarias !== null) {
            if (participacionesAccionarias.length > 0) {
                for (let i = 0; i < participacionesAccionarias.length; i++) {
                    participacionesAccionarias[i].nCodfperf = formPerfil.nCodfperf;
                    if (participacionesAccionarias[i].nCodparti !== undefined && participacionesAccionarias[i].nCodparti !== null) {
                        participacionesAccionarias[i].tFecreg = datepipe.transform((participacionesAccionarias[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        participacionesAccionarias[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesAccionarias[i].vUsuaupd = vUsua;
                        participacionesAccionarias[i].nSedeupd = nSede;
                        participacionesAccionarias[i].nFlgactivo = true;
                        participaService.update(participacionesAccionarias[i]).subscribe(
                            (participa) => participacionesAccionarias[i] = participa,
                        );
                    } else {
                        participacionesAccionarias[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesAccionarias[i].vUsuareg = vUsua;
                        participacionesAccionarias[i].nSedereg = nSede;
                        participacionesAccionarias[i].nFlgactivo = true;
                        participaService.create(participacionesAccionarias[i]).subscribe(
                            (participa) => participacionesAccionarias[i] = participa,
                        );
                    }
                }
            }
        }
        // Guardar Participaciones de Mercado
        if (participacionesMercados !== undefined && participacionesMercados !== null) {
            if (participacionesMercados.length > 0) {
                for (let i = 0; i < participacionesMercados.length; i++) {
                    participacionesMercados[i].nCodfperf = formPerfil.nCodfperf;
                    if (participacionesMercados[i].nCodparti !== undefined && participacionesMercados[i].nCodparti !== null) {
                        participacionesMercados[i].tFecreg = datepipe.transform((participacionesMercados[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        participacionesMercados[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesMercados[i].vUsuaupd = vUsua;
                        participacionesMercados[i].nSedeupd = nSede;
                        participacionesMercados[i].nFlgactivo = true;
                        participaService.update(participacionesMercados[i]).subscribe(
                            (participa) => participacionesMercados[i] = participa,
                        );
                    } else {
                        participacionesMercados[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesMercados[i].vUsuareg = vUsua;
                        participacionesMercados[i].nSedereg = nSede;
                        participacionesMercados[i].nFlgactivo = true;
                        participaService.create(participacionesMercados[i]).subscribe(
                            (participa) => participacionesMercados[i] = participa,
                        );
                    }
                }
            }
        }
        hechoinverService.eliminar(formPerfil.nCodfperf).subscribe();
        // Guardar Obras
        if (obras !== undefined && obras !== null) {
            if (obras.length > 0) {
                for (let i = 0; i < obras.length; i++) {
                    obras[i].nCodfperf = formPerfil.nCodfperf;
                    if (obras[i].nCodhinve !== undefined && obras[i].nCodhinve !== null) {
                        obras[i].tFecreg = datepipe.transform((obras[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        obras[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obras[i].vUsuaupd = vUsua;
                        obras[i].nSedeupd = nSede;
                        obras[i].nFlgactivo = true;
                        hechoinverService.update(obras[i]).subscribe(
                            (obra) => obras[i] = obra,
                        );
                    } else {
                        obras[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obras[i].vUsuareg = vUsua;
                        obras[i].nSedereg = nSede;
                        obras[i].nFlgactivo = true;
                        hechoinverService.create(obras[i]).subscribe(
                            (obra) => obras[i] = obra,
                        );
                    }
                }
            }
        }
        // Guardar Proyectos
        if (proyectos !== undefined && proyectos !== null) {
            if (proyectos.length > 0) {
                for (let i = 0; i < proyectos.length; i++) {
                    proyectos[i].nCodfperf = formPerfil.nCodfperf;
                    if (proyectos[i].nCodhinve !== undefined && proyectos[i].nCodhinve !== null) {
                        proyectos[i].tFecreg = datepipe.transform((proyectos[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        proyectos[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        proyectos[i].vUsuaupd = vUsua;
                        proyectos[i].nSedeupd = nSede;
                        proyectos[i].nFlgactivo = true;
                        hechoinverService.update(obras[i]).subscribe(
                            (obra) => obras[i] = obra,
                        );
                    } else {
                        proyectos[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        proyectos[i].vUsuareg = vUsua;
                        proyectos[i].nSedereg = nSede;
                        proyectos[i].nFlgactivo = true;
                        hechoinverService.create(proyectos[i]).subscribe(
                            (proyecto) => proyectos[i] = proyecto,
                        );
                    }
                }
            }
        }
        // Guardar Direcciones
        if (direcciones !== undefined && direcciones !== null) {
            if (direcciones.length > 0) {
                direccionService.eliminar(formPerfil.nCodfperf).subscribe();
                for (let i = 0; i < direcciones.length; i++) {
                    direcciones[i].nCodfperf = formPerfil.nCodfperf;
                    if (direcciones[i].nCoddirec !== undefined && direcciones[i].nCoddirec !== null) {
                        direcciones[i].tFecreg = datepipe.transform((direcciones[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        direcciones[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        direcciones[i].vUsuaupd = vUsua;
                        direcciones[i].nSedeupd = nSede;
                        direcciones[i].nFlgactivo = true;
                        if (direcciones[i].bNotifica) {
                            direcciones[i].nNotifica = 1;
                        } else {
                            direcciones[i].nNotifica = 0;
                        }
                        direccionService.update(direcciones[i]).subscribe();
                    } else {
                        direcciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        direcciones[i].vUsuareg = vUsua;
                        direcciones[i].nSedereg = nSede;
                        direcciones[i].nFlgactivo = true;
                        if (direcciones[i].bNotifica) {
                            direcciones[i].nNotifica = 1;
                        } else {
                            direcciones[i].nNotifica = 0;
                        }
                        direccionService.create(direcciones[i]).subscribe();
                    }
                }
            }
        }
        // Guardar Organizaciones de Negociacion Colectiva
        if (organizaciones !== undefined && organizaciones !== null) {
            if (organizaciones.length > 0) {
                negocolectService.eliminar(formPerfil.nCodfperf).subscribe();
                for (let i = 0; i < organizaciones.length; i++) {
                    organizaciones[i].nCodfperf = formPerfil.nCodfperf;
                    organizaciones[i].vTipongco = 'O';
                    if (organizaciones[i].nCodngcol !== undefined && organizaciones[i].nCodngcol !== null) {
                        organizaciones[i].tFecreg = datepipe.transform((organizaciones[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        organizaciones[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        organizaciones[i].vUsuaupd = vUsua;
                        organizaciones[i].nSedeupd = nSede;
                        organizaciones[i].nFlgactivo = true;
                        negocolectService.update(organizaciones[i]).subscribe(
                            (organizacion) => organizaciones[i] = organizacion,
                        );
                    } else {
                        organizaciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        organizaciones[i].vUsuareg = vUsua;
                        organizaciones[i].nSedereg = nSede;
                        organizaciones[i].nFlgactivo = true;
                        negocolectService.create(organizaciones[i]).subscribe(
                            (organizacion) => organizaciones[i] = organizacion,
                        );
                    }
                }
            }
        }
        // Guardar Solicitante de la Negociacion Colectiva
        if (solicitante !== undefined && solicitante !== null) {
            solicitante.nCodfperf = formPerfil.nCodfperf;
            solicitante.vRegistro = solicitud.vRegistro;
            solicitante.vTipongco = 'S';
            solicitante.vRazonsoc = solicitud.vSolicita;
            if (solicitante.nCodngcol !== undefined && solicitante.nCodngcol !== null) {
                solicitante.tFecreg = datepipe.transform((solicitante.tFecreg), 'yyyy-MM-dd HH:mm:ss');
                solicitante.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                solicitante.vUsuaupd = vUsua;
                solicitante.nSedeupd = nSede;
                solicitante.nFlgactivo = true;
                negocolectService.update(solicitante).subscribe(
                    (obj) => {
                        solicitante = obj;
                    },
                );
            } else {
                solicitante.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                solicitante.vUsuareg = vUsua;
                solicitante.nSedereg = nSede;
                solicitante.nFlgactivo = true;
                negocolectService.create(solicitante).subscribe(
                    (obj) => solicitante = obj,
                );
            }
        }
        // Guardar Resultado de Negociaciones
        if (resultadoNegociaciones !== undefined && resultadoNegociaciones !== null) {
            if (resultadoNegociaciones.length > 0) {
                resulnegocService.eliminar(formPerfil.nCodfperf).subscribe();
                for (let i = 0; i < resultadoNegociaciones.length; i++) {
                    resultadoNegociaciones[i].nCodfperf = formPerfil.nCodfperf;
                    if (resultadoNegociaciones[i].nCodreneg !== undefined && resultadoNegociaciones[i].nCodreneg !== null) {
                        resultadoNegociaciones[i].tFecreg = datepipe.transform((resultadoNegociaciones[i].tFecreg), 'yyyy-MM-dd HH:mm:ss');
                        resultadoNegociaciones[i].tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        resultadoNegociaciones[i].vUsuaupd = vUsua;
                        resultadoNegociaciones[i].nSedeupd = nSede;
                        resultadoNegociaciones[i].nFlgactivo = true;
                        resulnegocService.update(resultadoNegociaciones[i]).subscribe(
                            (resultado) => resultadoNegociaciones[i] = resultado,
                        );
                    } else {
                        resultadoNegociaciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        resultadoNegociaciones[i].vUsuareg = vUsua;
                        resultadoNegociaciones[i].nSedereg = nSede;
                        resultadoNegociaciones[i].nFlgactivo = true;
                        resulnegocService.create(resultadoNegociaciones[i]).subscribe(
                            (resultado) => resultadoNegociaciones[i] = resultado,
                        );
                    }
                }
            }
        }
        // Guardar Responsable de Informacion Economica y Financiera
        if (responInfoFinanciera !== undefined && responInfoFinanciera !== null) {
            responInfoFinanciera.nCodfperf = formPerfil.nCodfperf;
            if (responInfoFinanciera.nCodrinfo !== undefined && responInfoFinanciera.nCodrinfo !== null) {
                responInfoFinanciera.tFecreg = datepipe.transform((responInfoFinanciera.tFecreg), 'yyyy-MM-dd HH:mm:ss');
                responInfoFinanciera.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responInfoFinanciera.vUsuaupd = vUsua;
                responInfoFinanciera.nSedeupd = nSede;
                responInfoFinanciera.vTipores = 'F';
                responInfoFinanciera.nFlgactivo = true;
                respinformaService.update(responInfoFinanciera).subscribe(
                    (obj) => responInfoFinanciera = obj,
                );
            } else {
                responInfoFinanciera.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responInfoFinanciera.vUsuareg = vUsua;
                responInfoFinanciera.nSedereg = nSede;
                responInfoFinanciera.nFlgactivo = true;
                responInfoFinanciera.vTipores = 'F';
                respinformaService.create(responInfoFinanciera).subscribe(
                    (obj) => responInfoFinanciera = obj,
                );
            }
        }
        // Guardar Responsable de Informacion Laboral
        if (responeInfoLaboral !== undefined && responeInfoLaboral !== null) {
            responeInfoLaboral.nCodfperf = formPerfil.nCodfperf;
            if (responeInfoLaboral.nCodrinfo !== undefined && responeInfoLaboral.nCodrinfo !== null) {
                responeInfoLaboral.tFecreg = datepipe.transform((responeInfoLaboral.tFecreg), 'yyyy-MM-dd HH:mm:ss');
                responeInfoLaboral.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responeInfoLaboral.vUsuaupd = vUsua;
                responeInfoLaboral.nSedeupd = nSede;
                responeInfoLaboral.nFlgactivo = true;
                responInfoFinanciera.vTipores = 'L';
                respinformaService.update(responeInfoLaboral).subscribe(
                    (obj) => responeInfoLaboral = obj,
                );
            } else {
                responeInfoLaboral.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responeInfoLaboral.vUsuareg = vUsua;
                responeInfoLaboral.nSedereg = nSede;
                responeInfoLaboral.nFlgactivo = true;
                responInfoFinanciera.vTipores = 'L';
                respinformaService.create(responeInfoLaboral).subscribe(
                    (obj) => responeInfoLaboral = obj,
                );
            }
        }
        if (selectedRegimen !== undefined && selectedRegimen !== null) {
            for (let i = 0; i < selectedRegimen.length; i++) {
                const regimen: ComboModel = selectedRegimen[i];
                const obj: Perreglab = new Perreglab();
                const objId: PerreglabId = new PerreglabId();

                objId.nCodfperf = formPerfil.nCodfperf;
                objId.nCodreglab = Number(regimen.value);
                console.log('regimen.value:' + regimen.value);

                perreglabService.eliminarRegimenes(objId.nCodfperf, objId.nCodreglab).subscribe(
                    (res: ResponseWrapper) => {
                        obj.PerreglabId = objId;
                        obj.nFlgactivo = true;
                        obj.nSedereg = nSede;
                        obj.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj.vUsuareg = vUsua;
                        perreglabService.create(obj).subscribe();
                    },
                    (res: ResponseWrapper) => res.json,
                );
            }
        }

        if (formulario !== undefined && formulario !== null) {
            for (let i = 0; i < formulario.length; i++) {
                for (let j = 0; j < formulario[i].listaContrataDirecta.length; j++) {
                    // Contratacion Directa
                    for (let k = 0; k < formulario[i].listaContrataDirecta[j].componentes.length; k++) {
                        const obj = new Anexlaboral();
                        obj.nAnioanex = formulario[i].anio;
                        obj.vTipocont = 'DI';
                        obj.nCodfperf = formPerfil.nCodfperf;
                        obj.vDesanexo = formulario[i].listaContrataDirecta[j].descripcion;
                        obj.vDeclegal = formulario[i].listaContrataDirecta[j].componentes[k].declegal;
                        obj.nCantlabo = formulario[i].listaContrataDirecta[j].componentes[k].cantidad;
                        obj.vComponen = formulario[i].listaContrataDirecta[j].componentes[k].componente;

                        if (formulario[i].listaContrataDirecta[j].codigo !== undefined && formulario[i].listaContrataDirecta[j].codigo !== null) {
                            obj.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                            obj.vUsuaupd = vUsua;
                            obj.nSedeupd = nSede;
                            obj.nFlgactivo = true;
                            anexlaboralService.update(obj).subscribe();
                        } else {
                            obj.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                            obj.vUsuareg = vUsua;
                            obj.nSedereg = nSede;
                            obj.nFlgactivo = true;
                            anexlaboralService.create(obj).subscribe();
                        }
                    }
                }
                for (let j = 0; j < formulario[i].listaContrataIndirecta1.length; j++) {
                    // Contratacion Indirecta 1
                    const obj2 = new Anexlaboral();
                    obj2.nAnioanex = formulario[i].anio;
                    obj2.nCodfperf = formPerfil.nCodfperf;
                    obj2.vTipocont = 'I1';
                    obj2.vDesanexo = formulario[i].listaContrataIndirecta1[j].descripcion;
                    obj2.vDeclegal = 'NA';
                    obj2.nCantlabo = formulario[i].listaContrataIndirecta1[j].componentes[0].cantidad;
                    obj2.vComponen = formulario[i].listaContrataIndirecta1[j].componentes[0].componente;

                    if (formulario[i].listaContrataIndirecta1[j].codigo !== undefined && formulario[i].listaContrataIndirecta1[j].codigo !== null) {
                        obj2.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj2.vUsuaupd = vUsua;
                        obj2.nSedeupd = nSede;
                        obj2.nFlgactivo = true;
                        anexlaboralService.update(obj2).subscribe();
                    } else {
                        obj2.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj2.vUsuareg = vUsua;
                        obj2.nSedereg = nSede;
                        obj2.nFlgactivo = true;
                        anexlaboralService.create(obj2).subscribe();
                    }
                }
                for (let j = 0; j < formulario[i].listaContrataIndirecta2.length; j++) {
                    // Contratacion Indirecta 2
                    const obj3 = new Anexlaboral();
                    obj3.nAnioanex = formulario[i].anio;
                    obj3.nCodfperf = formPerfil.nCodfperf;
                    obj3.vTipocont = 'I2';
                    obj3.vDesanexo = formulario[i].listaContrataIndirecta2[j].descripcion;
                    obj3.vDeclegal = 'NA';
                    obj3.nCantlabo = formulario[i].listaContrataIndirecta2[j].componentes[0].cantidad;
                    obj3.vComponen = formulario[i].listaContrataIndirecta2[j].componentes[0].componente;

                    if (formulario[i].listaContrataIndirecta2[j].codigo !== undefined && formulario[i].listaContrataIndirecta2[j].codigo !== null) {
                        obj3.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj3.vUsuaupd = vUsua;
                        obj3.nSedeupd = nSede;
                        obj3.nFlgactivo = true;
                        anexlaboralService.update(obj3).subscribe();
                    } else {
                        obj3.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj3.vUsuareg = vUsua;
                        obj3.nSedereg = nSede;
                        obj3.nFlgactivo = true;
                        anexlaboralService.create(obj3).subscribe();
                    }
                }
                for (let j = 0; j < formulario[i].listaContrataNoLaboral.length; j++) {
                    // Contratacion No Laboral
                    const obj4 = new Anexlaboral();
                    obj4.nAnioanex = formulario[i].anio;
                    obj4.nCodfperf = formPerfil.nCodfperf;
                    obj4.vTipocont = 'NL';
                    obj4.vDesanexo = formulario[i].listaContrataNoLaboral[j].descripcion;
                    obj4.vDeclegal = 'NA';
                    obj4.nCantlabo = formulario[i].listaContrataNoLaboral[j].componentes[0].cantidad;
                    obj4.vComponen = formulario[i].listaContrataNoLaboral[j].componentes[0].componente;

                    if (formulario[i].listaContrataNoLaboral[j].codigo !== undefined && formulario[i].listaContrataNoLaboral[j].codigo !== null) {
                        obj4.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj4.vUsuaupd = vUsua;
                        obj4.nSedeupd = nSede;
                        obj4.nFlgactivo = true;
                        anexlaboralService.update(obj4).subscribe();
                    } else {
                        obj4.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obj4.vUsuareg = vUsua;
                        obj4.nSedereg = nSede;
                        obj4.nFlgactivo = true;
                        anexlaboralService.create(obj4).subscribe();
                    }

                }

            }
        }
    }

    validarDatosObligatorios(solicitud: Solicitud, formPerfil: Formperfil, obras: Hechoinver[], solicitante: Negocolect): Message[] {
        let messagesForm: Message[] = [];
        let messageList: any = [];
        let error: boolean;

        if (formPerfil.vNomcomer === undefined || formPerfil.vNomcomer === null || formPerfil.vNomcomer.trim() === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el nombre comercial en Datos Generales I.' });
            error = false;
        } else if (formPerfil.vCodciiu === undefined || formPerfil.vCodciiu === null || formPerfil.vCodciiu.trim() === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar la CIIU en Datos Generales I.' });
            error = false;
        } else if (formPerfil.vPartreg === undefined || formPerfil.vPartreg === null || formPerfil.vPartreg.trim() === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de la Partida Registral en Datos Generales I.' });
            error = false;
        } else if (formPerfil.vSector === undefined || formPerfil.vSector === null || formPerfil.vSector.trim() === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el Sector en Datos Generales II.' });
            error = false;
        } else if (formPerfil.vPlancont === undefined || formPerfil.vPlancont === null || formPerfil.vPlancont.trim() === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el Plan Contable en Datos Generales II.' });
            error = false;
        } else if (obras === undefined || obras === null) {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar como mínimo una obra principal en Datos Generales II.' });
            error = false;
        } else if (solicitante === undefined || solicitante === null) {
            // tslint:disable-next-line:max-line-length
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el registro de la organizacion sindical solicitante en Negociación Colectiva.' });
            error = false;
        } else if (solicitante !== undefined && solicitante !== null) {
            if (solicitud.vRegistro === undefined || solicitud.vRegistro === null || solicitud.vRegistro.trim() === '') {
                // tslint:disable-next-line:max-line-length
                messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el registro de la organizacion sindical solicitante en Negociación Colectiva.' });
                error = false;
            } else if (solicitud.vSolicita === undefined || solicitud.vSolicita === null || solicitud.vSolicita.trim() === '') {
                // tslint:disable-next-line:max-line-length
                messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el Nombre de la organizacion sindical solicitante en Negociación Colectiva.' });
                error = false;
            } else if (solicitante.vRucneg === undefined || solicitante.vRucneg === null || solicitante.vRucneg.trim() === '') {
                // tslint:disable-next-line:max-line-length
                messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el RUC de la organizacion sindical solicitante en Negociación Colectiva.' });
                error = false;
            } else if (solicitante.vAmbsubje === undefined || solicitante.vAmbsubje === null || solicitante.vAmbsubje.trim() === '') {
                // tslint:disable-next-line:max-line-length
                messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el Ámbito Subjetivo de la organizacion sindical solicitante en Negociación Colectiva.' });
                error = false;
            } else if (solicitante.vEtapaneg === undefined || solicitante.vEtapaneg === null || solicitante.vEtapaneg.trim() === '') {
                // tslint:disable-next-line:max-line-length
                messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar la Etapa de solicitud de la organizacion sindical solicitante en Negociación Colectiva.' });
                error = false;
            } else {
                messageList = [];
                messagesForm = [];
                error = true;
            }
        } else {
            messageList = [];
            messagesForm = [];
            error = true;
        }
        messagesForm = this.onErrorMultiple(messageList, messagesForm);
        return messagesForm;
    }

    private onErrorMultiple(errorList: any, messagesForm: Message[]): Message[] {
        for (let i = 0; i < errorList.length; i++) {
            messagesForm.push(errorList[i]);
        }
        return messagesForm
    }

    consultaDepas(): any {
        return this.http.get(`${this.resourceDepa}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDepa(depas: any): any {
        return this.http.get(`${this.resourceDepa}/${depas}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaProvs(depas: any): any {
        return this.http.get(`${this.resourceProv}/${depas}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaProv(depas: any, prov: any): any {
        return this.http.get(`${this.resourceProv}/${depas}/${prov}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDist(depas: any, prov: any, dist: any): any {
        return this.http.get(`${this.resourceDist}/${depas}/${prov}/${dist}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaDists(depas: any, prov: any): any {
        return this.http.get(`${this.resourceDist}/${depas}/${prov}`).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTipoDoc, null)
            .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
    }

    private convertResponseTipoDocIdentidad(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];

        for (let i = 0; i < jsonResponse.length; i++) {

            const cm: Tipdocident = this.convertTipoDocFromServer(jsonResponse[i]);
            result.push(new ComboModel(cm.vDescorta, cm.id.toString(), cm.nNumdigi));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertTipoDocFromServer(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }
}
