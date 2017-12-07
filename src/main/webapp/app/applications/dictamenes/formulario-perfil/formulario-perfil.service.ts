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

@Injectable()
export class FormularioPerfilService {

    private resourceSunatUrl = '/api/sunat';
    private resourceReniecUrl = '/api/reniec';
    private resourceMigracionUrl = '/api/migracion';

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
                            anexoLaboral: ModelAnexo[],
                            formPerfilService: FormperfilService,
                            undNegocioservice: UndnegocioService,
                            participaService: ParticipaService,
                            hechoinverService: HechoinverService,
                            direccionService: DireccionService,
                            negocolectService: NegocolectService,
                            resulnegocService: ResulnegocService,
                            respinformaService: RespinformaService) {
        // Guardar Formulario Perfil
        if (formPerfil !== undefined && formPerfil !== null) {

            formPerfil.tFecreg = datepipe.transform((formPerfil.tFecreg), 'yyyy-MM-dd HH:mm:ss')
            formPerfil.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
            formPerfil.vUsuaupd = 'CODUSU';
            formPerfil.nSedeupd = 0;
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
                        undNegocios[i].vUsuaupd = 'CODUSU';
                        undNegocios[i].nSedeupd = 0;
                        undNegocios[i].nFlgactivo = true;
                        undNegocioservice.update(undNegocios[i]).subscribe(
                            (undNegocio) => undNegocios[i] = undNegocio,
                        );
                    } else {
                        undNegocios[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        undNegocios[i].vUsuareg = 'CODUSU';
                        undNegocios[i].nSedereg = 0;
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
                        participacionesAccionarias[i].vUsuaupd = 'CODUSU';
                        participacionesAccionarias[i].nSedeupd = 0;
                        participacionesAccionarias[i].nFlgactivo = true;
                        participaService.update(participacionesAccionarias[i]).subscribe(
                            (participa) => participacionesAccionarias[i] = participa,
                        );
                    } else {
                        participacionesAccionarias[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesAccionarias[i].vUsuareg = 'CODUSU';
                        participacionesAccionarias[i].nSedereg = 0;
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
                        participacionesMercados[i].vUsuaupd = 'CODUSU';
                        participacionesMercados[i].nSedeupd = 0;
                        participacionesMercados[i].nFlgactivo = true;
                        participaService.update(participacionesMercados[i]).subscribe(
                            (participa) => participacionesMercados[i] = participa,
                        );
                    } else {
                        participacionesMercados[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        participacionesMercados[i].vUsuareg = 'CODUSU';
                        participacionesMercados[i].nSedereg = 0;
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
                        obras[i].vUsuaupd = 'CODUSU';
                        obras[i].nSedeupd = 0;
                        obras[i].nFlgactivo = true;
                        hechoinverService.update(obras[i]).subscribe(
                            (obra) => obras[i] = obra,
                        );
                    } else {
                        obras[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        obras[i].vUsuareg = 'CODUSU';
                        obras[i].nSedereg = 0;
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
                        proyectos[i].vUsuaupd = 'CODUSU';
                        proyectos[i].nSedeupd = 0;
                        proyectos[i].nFlgactivo = true;
                        hechoinverService.update(obras[i]).subscribe(
                            (obra) => obras[i] = obra,
                        );
                    } else {
                        proyectos[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        proyectos[i].vUsuareg = 'CODUSU';
                        proyectos[i].nSedereg = 0;
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
                        direcciones[i].vUsuaupd = 'CODUSU';
                        direcciones[i].nSedeupd = 0;
                        direcciones[i].nFlgactivo = true;
                        if (direcciones[i].bNotifica) {
                            direcciones[i].nNotifica = 1;
                        } else {
                            direcciones[i].nNotifica = 0;
                        }
                        direccionService.update(direcciones[i]).subscribe();
                        console.log('direcciones[i].nFlgactivo: ' + direcciones[i].nFlgactivo);
                    } else {
                        direcciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        direcciones[i].vUsuareg = 'CODUSU';
                        direcciones[i].nSedereg = 0;
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
                        organizaciones[i].vUsuaupd = 'CODUSU';
                        organizaciones[i].nSedeupd = 0;
                        organizaciones[i].nFlgactivo = true;
                        negocolectService.update(organizaciones[i]).subscribe(
                            (organizacion) => organizaciones[i] = organizacion,
                        );
                    } else {
                        organizaciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        organizaciones[i].vUsuareg = 'CODUSU';
                        organizaciones[i].nSedereg = 0;
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
            console.log('solicitante.nCodngcol: ' + solicitante.nCodngcol);
            if (solicitante.nCodngcol !== undefined && solicitante.nCodngcol !== null) {
                solicitante.tFecreg = datepipe.transform((solicitante.tFecreg), 'yyyy-MM-dd HH:mm:ss');
                solicitante.tFecupd = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                solicitante.vUsuaupd = 'CODUSU';
                solicitante.nSedeupd = 0;
                solicitante.nFlgactivo = true;
                negocolectService.update(solicitante).subscribe(
                    (obj) => {solicitante = obj;
                    console.log('solicitante.vRucneg: ' + solicitante.vRucneg)},
                );
            } else {
                solicitante.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                solicitante.vUsuareg = 'CODUSU';
                solicitante.nSedereg = 0;
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
                        resultadoNegociaciones[i].vUsuaupd = 'CODUSU';
                        resultadoNegociaciones[i].nSedeupd = 0;
                        resultadoNegociaciones[i].nFlgactivo = true;
                        resulnegocService.update(resultadoNegociaciones[i]).subscribe(
                            (resultado) => resultadoNegociaciones[i] = resultado,
                        );
                    } else {
                        resultadoNegociaciones[i].tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        resultadoNegociaciones[i].vUsuareg = 'CODUSU';
                        resultadoNegociaciones[i].nSedereg = 0;
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
                responInfoFinanciera.vUsuaupd = 'CODUSU';
                responInfoFinanciera.nSedeupd = 0;
                responInfoFinanciera.nFlgactivo = true;
                respinformaService.update(responInfoFinanciera).subscribe(
                    (obj) => responInfoFinanciera = obj,
                );
            } else {
                responInfoFinanciera.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responInfoFinanciera.vUsuareg = 'CODUSU';
                responInfoFinanciera.nSedereg = 0;
                responInfoFinanciera.nFlgactivo = true;
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
                responeInfoLaboral.vUsuaupd = 'CODUSU';
                responeInfoLaboral.nSedeupd = 0;
                responeInfoLaboral.nFlgactivo = true;
                respinformaService.update(responeInfoLaboral).subscribe(
                    (obj) => responeInfoLaboral = obj,
                );
            } else {
                responeInfoLaboral.tFecreg = datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                responeInfoLaboral.vUsuareg = 'CODUSU';
                responeInfoLaboral.nSedereg = 0;
                responeInfoLaboral.nFlgactivo = true;
                respinformaService.create(responeInfoLaboral).subscribe(
                    (obj) => responeInfoLaboral = obj,
                );
            }
        }
        if (anexoLaboral !== undefined && anexoLaboral !== null) {
            // Falta terminar
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

}
