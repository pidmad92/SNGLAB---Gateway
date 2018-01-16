import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasegl } from '../models/pasegl.model';
import { Atencion } from '../models/atencion.model';
import { Empleador } from '../models/empleador.model';
import { Datlab } from '../models/datlab.model';
import { Dirpernat } from '../models/dirpernat.model';
import { Dirperjuri } from '../models/dirperjuri.model';
import { Trabajador } from '../models/trabajador.model';
import { Motatenofic } from '../models/motatenofic.model';
import { Motateselec } from '../models/motateselec.model';
import { Accadoate } from '../models/accadoate.model';
import { Accionadop } from '../models/accionadop.model';
import { Docpresate } from '../models/docpresate.model';
import { Documento } from '../models/documento.model';
import { Docinperdlb } from '../models/docinperdlb.model';
import { Docingrper } from '../models/docingrper.model';
import { Cartrab } from '../models/cartrab.model';
import { Regimenlab } from '../models/regimenlab.model';
import { Motcese } from '../models/motcese.model';
import { Modcontrato } from '../models/modcontrato.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import {ComboModel} from '../../general/combobox.model';
import { Tipdocident } from '../models/tipdocident.model';

@Injectable()
export class AtencionTrabajadorService {

    private resource = '/consultas/api/';

    // RUTAS POR ENTIDAD
    private resourcePasegl      = this.resource + 'pasegls';
    private resourceAtencion    = this.resource + 'atencions';
    private resourceDatoslab    = this.resource + 'datlabs';
    private resourceTipoDoc     = this.resource + 'tipdocidents';
    private resourceTrabajador  = this.resource + 'trabajadors';
    private resourceEmpleador   = this.resource + 'empleadors';
    private resourceDPerNat     = this.resource + 'dirpernats';
    private resourceDPerJuri    = this.resource + 'dirperjuris';
    private resourceMotateOfi   = this.resource + 'motatenofics';
    private resourceMotateSelec = this.resource + 'motateselecs';
    private resourceDocpresa    = this.resource + 'docpresates';
    private resourceDocumento   = this.resource + 'documentos';
    private resourceDocingper   = this.resource + 'docinperdlbs';
    private resourceDocingtot   = this.resource + 'docingrpers';
    private resourceCargoTrab   = this.resource + 'cartrabs';
    private resourceAccadoate   = this.resource + 'accadoates';
    private resourceAccionadop  = this.resource + 'accionadops';
    private resourceMotcese     = this.resource + 'motcese';
    private resourceRegimenlab  = this.resource + 'regimenlabs';
    private resourceModcontrato = this.resource + 'modcontratoes';

    // RUTAS DE UBIGEO
    private resourceDepa = this.resource + 'departamentos';
    private resourceProv = this.resource + 'provincias';
    private resourceDist = this.resource + 'distritos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    // -- UBIGEO

        /**
         * Ubigeo: Departamentos
         * @param  {any} req?
         * @returns Observable
         */
        consDep(req?: any): Observable<ResponseWrapper> {
            const options = createRequestOption(req);
            return this.http.get(this.resourceDepa, options)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
        /**
         * Ubigeo: Provincia
         * @param  {string} id
         * @returns Observable
         */
        consProv(id: string): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceProv}/${id}`)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
        /**
         * Ubigeo: Distrito
         * @param  {string} id
         * @param  {string} idprov
         * @returns Observable
         */
        consDis(id: string, idprov: string): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceDist}/${id}/${idprov}`)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
    // --

    // -- TIPO DE DOCUMENTO

        /**
         * Tipo de Documento de Identidad
         * @returns Observable
         */
        consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceTipoDoc, null)
                .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
        }
    // --

    // -- DIRECCIONES PERSONA NATURAL

        /**
         * Retorna las direcciones de una persona natural
         * @param  {number} id
         * @returns Observable
         */
        buscarDireccionesPerNat(id: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceDPerNat}/trabajador/id/${id}`)
                .map((res: Response) => this.convertResponseDirPerNat(res));
        }

        /**
         * Grabar direcciòn persona natural
         * @param  {Dirpernat} dirpernat
         * @returns Observable
         */
        createDirPerNat(dirpernat: Dirpernat): Observable<Dirpernat> {
            dirpernat.nUsuareg = 1;
            dirpernat.nFlgactivo = true;
            dirpernat.nSedereg = 1;
            const copy = this.convertDirPerNat(dirpernat);
            return this.http.post(this.resourceDPerNat, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDirPerNat(jsonResponse);
            });
        }

        /**
         * Actualizar direcciòn persona natural
         * @param  {Dirpernat} dirpernat
         * @returns Observable
         */
        updateDirPerNat(dirpernat: Dirpernat): Observable<Dirpernat> {
            const copy = this.convertDirPerNat(dirpernat);
            return this.http.put(this.resourceDPerNat, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDirPerNat(jsonResponse);
            });
        }
    // --

    // -- DIRECCIONES PERSONA JURÍDICA

        /**
         * Retorna las direcciones de una persona jurìdica
         * @param  {number} id
         * @returns Observable
         */
        buscarDireccionesPerJuri(id: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceDPerJuri}/empleador/id/${id}`)
                .map((res: Response) => this.convertResponseDirPerJuri(res));
        }

        /**
         * Grabar direcciòn persona jurìdica
         * @param  {Dirperjuri} dirperjuri
         * @returns Observable
         */
        createDirPerJuri(dirperjuri: Dirperjuri): Observable<Dirperjuri> {
            dirperjuri.nUsuareg = 1;
            dirperjuri.nFlgactivo = true;
            dirperjuri.nSedereg = 1;
            const copy = this.convertDirPerJuri(dirperjuri);
            return this.http.post(this.resourceDPerJuri, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDirPerJuri(jsonResponse);
            });
        }

        /**
         * Grabar direccòn persona jurìdica
         * @param  {Dirperjuri} dirperjuri
         * @returns Observable
         */
        updateDirPerjuri(dirperjuri: Dirperjuri): Observable<Dirperjuri> {
            const copy = this.convertDirPerJuri(dirperjuri);
            return this.http.put(this.resourceDPerJuri, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDirPerJuri(jsonResponse);
            });
        }
    // --

// PASES

        // /**
        //  * Buscar Pases de Empleador, para una oficina con un estado de pase
        //  * @param  {String} id
        //  * @returns Observable
        //  */
        // findPasesByEmpleadorOficinaEstadopase(id_trab: number, id_ofic: number, estpase: number): Observable<ResponseWrapper> {
        //     return this.http.get(`${this.resourcePasegl}/pases/empleador/${id_trab}/oficina/${id_ofic}/estado/${estpase}`)
        //         .map((res: Response) => this.convertResponsePase(res));
        // }

        /**
         * Buscar Pases por código de Trabajador
         * @param  {String} id
         * @returns Observable
         */
        findPasesByTrabajador(id_trab: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourcePasegl}/pase/general/id_trabajador/${id_trab}`)
                .map((res: Response) => this.convertResponsePase(res));
        }

    // -- TRABAJADORES

        /**
         * Buscar trabajador por id
         * @param  {number} id
         * @returns Observable
         */
        findTrabajadorById(id: number): Observable<Trabajador> {
            return this.http.get(`${this.resourceTrabajador}/${id}`).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerTrabajador(jsonResponse);
            });
        }

        /**
         * Buscar trabajador por tipo de documento de identidad y nùmero de documento
         * @param  {number} tipodoc
         * @param  {String} numdoc
         * @returns Observable
         */
        findTrabajadorByDocIdent(tipodoc: number, numdoc: String): Observable<Trabajador> {
            return this.http.get(`${this.resourceTrabajador}/tipdoc/${tipodoc}/numdoc/${numdoc}`)
                .map((res: Response) => {
                    const jsonResponse = res.json();
                    return this.convertItemFromServerTrabajador(jsonResponse);
                });
        }

        /** Buscar lista de trabajadores por tipo  de documento de identidad y nùmero de documento
         * @param  {number} tipodoc
         * @param  {String} numdoc
         * @returns Observable
         */
        findTrabajadorsByDocIdent(tipodoc: number, numdoc: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceTrabajador}/tipdoc/${tipodoc}/numdocs/${numdoc}`)
                .map((res: Response) => this.convertResponseTrabajadorTrabajador(res));
        }

        /**
         * Buscar trabajador por nombres
         * @param  {String} nombres
         * @param  {String} apellidopat
         * @param  {String} apellidomat
         * @returns Observable
         */
        findTrabajadorsByName(nombres: String, apellidopat: String, apellidomat: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceTrabajador}/nombres/${nombres}/apellidopat/${apellidopat}/apellidomat/${apellidomat}`)
                .map((res: Response) => this.convertResponseTrabajadorTrabajador(res));
        }
    // --

// EMPLEADORES

        /**
         * Buscar Empleador por id
         * @param  {number} id
         * @returns Observable
         */
        findEmpleadorById(id: number): Observable<Empleador> {
            return this.http.get(`${this.resourceEmpleador}/${id}`).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerEmpleador(jsonResponse);
            });
        }

        /**
         * Buscar Empleador por tipo de documento de identidad y nùmero de documento
         * @param  {number} tipodoc
         * @param  {String} numdoc
         * @returns Observable
         */
        findEmpleadorsByDocIdent(tipodoc: number, numdoc: String, tipper: number): Observable<Empleador> {
            return this.http.get(`${this.resourceEmpleador}/tipdoc/${tipodoc}/numdoc/${numdoc}/bandperjuri/${tipper}`)
                .map((res: Response) => {
                    const jsonResponse = res.json();
                    return this.convertItemFromServerEmpleador(jsonResponse);
                });
        }

        /** Buscar Consulta lista de Empleadores por tipo  de documento de identidad y nùmero de documento
         * @param  {number} tipodoc
         * @param  {String} numdoc
         * @returns Observable
         */
        findConsultaEmpleadorsByDocIdent(tipodoc: number, numdoc: String, tipper: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceEmpleador}/consulta/tipdoc/${tipodoc}/numdoc/${numdoc}/bandperjuri/${tipper}`)
                .map((res: Response) => this.convertResponseEmpleadorEmpleador(res));
        }

        /**
         * Buscar Empleador por Razón Social
         * @param  {String} razsocial
         * @returns Observable
         */
        findEmpleadorsByRazSocial(razsocial: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceEmpleador}/razsocial/${razsocial}`)
                .map((res: Response) => this.convertResponseEmpleadorEmpleador(res));
        }

        /**
         * Buscar Empleador por Consulta Razón Social
         * @param  {String} razsocial
         * @returns Observable
         */
        findConsultaEmpleadorsByRazSocial(razsocial: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceEmpleador}/consulta/razsocial/${razsocial}`)
                .map((res: Response) => this.convertResponseEmpleadorEmpleador(res));
        }

    // -- ATENCION

        createAtencion(atencion: Atencion): Observable<Atencion> {
            atencion.nUsuareg = 1;
            atencion.nFlgactivo = true;
            atencion.nSedereg = 1;
            const copy = this.convertAtencion(atencion);
            return this.http.post(this.resourceAtencion, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerAtencion(jsonResponse);
            });
        }

        /**
         * Buscar atencìòn por còdigo
         * @param  {any} id
         * @returns Observable
         */
        findAtencion(id: any): Observable<Trabajador> {
            return this.http.get(`${this.resourceAtencion}/${id}`).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerAtencion(jsonResponse);
            });
        }

        /**
         * Buscar Atenciones por còdigo de trabajador
         * @param  {String} id
         * @returns Observable
         */
        findAtencionsByTrabajador(id: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceAtencion}/atenpase/trabajador/id/${id}`)
                .map((res: Response) => this.convertResponseAtencion(res));
        }
    // --

    // -- DATOS LABORALES
        createDatoslab(datlab: Datlab): Observable<Datlab> {
            datlab.nUsuareg = 1;
            datlab.nFlgactivo = true;
            datlab.nSedereg = 1;
            const copy = this.convertDatlab(datlab);
            return this.http.post(this.resourceDatoslab, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDatlab(jsonResponse);
            });
        }

    // --

    // -- MOTIVOS - OFICINA
        /**
         * Busca la lista de motivos por el id de la Oficina
         * @param  {number} id
         * @returns Observable
         */
        findListaMotatenOfic(id: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceMotateOfi}/oficina/id/${id}`)
            .map((res: Response) => this.convertResponseMotateofi(res));
        }
    // --

    // -- MOTIVOS SELECCIONADOS
        createMotateselec(motateselec: Motateselec): Observable<Motateselec> {
            motateselec.nUsuareg = 1;
            motateselec.nFlgactivo = true;
            motateselec.nSedereg = 1;
            const copy = this.convertMotateselec(motateselec);
            return this.http.post(this.resourceMotateSelec, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerMotateselec(jsonResponse);
            });
        }

        /**
         * Busca la lista de motivos seleccionados en el caso de cargar una atención grabada anteriormente.
         * @param  {number} idAtencion
         * @param  {number} idOficina
         * @returns Observable
         */
        findListaMotateSelec(idAtencion: number, idOficina: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceMotateSelec}/seleccion/id_atencion/${idAtencion}/id_oficina/${idOficina}`)
            .map((res: Response) => this.convertResponseMotateselec(res));
        }
    // --

    // -- DOCUMENTOS TABLA MAESTRA
        findListaDocumentosActivos(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocumento)
            .map((res: Response) => this.convertResponseDocumento(res));
        }
    // --

    // -- lISTAR LOS DOCUMENTOS PRESENTADOS
        createDocpresate(docpresate: Docpresate): Observable<Docpresate> {
            docpresate.nUsuareg = 1;
            docpresate.nFlgactivo = true;
            docpresate.nSedereg = 1;
            const copy = this.convertDocpresate(docpresate);
            return this.http.post(this.resourceDocpresa, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDocpresate(jsonResponse);
            });
        }
        findListaDocpresateActivos(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocpresa)
            .map((res: Response) => this.convertResponseDocpresate(res));
        }
    // --

    // -- lISTAR LOS CARGOS DE TRABAJADOR
        findListaCartrab(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceCargoTrab)
            .map((res: Response) => this.convertResponseCargotrab(res));
        }
    // --

    // -- lISTAR LOS ACCIONES ADOPTADAS
        createAccadoate(accadoate: Accadoate): Observable<Accadoate> {
            accadoate.nUsuareg = 1;
            accadoate.nFlgactivo = true;
            accadoate.nSedereg = 1;
            const copy = this.convertAccadoate(accadoate);
            return this.http.post(this.resourceAccadoate, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerAccadoate(jsonResponse);
            });
        }
        findListaAccionadop(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceAccionadop)
            .map((res: Response) => this.convertResponseAccionadop(res));
        }
    // --

    // -- LISTAR DE DOCUMENTO DE INGRESOS
        createDocinperdlb(docinperdlb: Docinperdlb): Observable<Docinperdlb> {
            docinperdlb.nUsuareg = 1;
            docinperdlb.nFlgactivo = true;
            docinperdlb.nSedereg = 1;
            const copy = this.convertDocinperdlb(docinperdlb);
            return this.http.post(this.resourceDocingper, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerDocingper(jsonResponse);
            });
        }

        findListaDocumentosPercibidosActivos(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocingtot + '/activos')
            .map((res: Response) => this.convertResponseDocingper(res));
        }
    // --

    // -- lISTAR LOS DOCUMENTOS DE INGRESOS PERCIBIDOS
        findListaDocumentosPercibidosSelec(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocingper)
            .map((res: Response) => this.convertResponseDocingper(res));
        }
    // --

    // -- MOTIVOS DE CESE

        createMotivCese(motcese: Motcese): Observable<Motcese> {
            motcese.nUsuareg = 1;
            motcese.nFlgactivo = true;
            motcese.nSedereg = 1;
            const copy = this.convertMotivcese(motcese);
            return this.http.post(this.resourceMotcese, copy).map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServerMotcese(jsonResponse);
            });
        }

        findListaMotivcese(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceMotcese + '/activos')
            .map((res: Response) => this.convertResponseMotcese(res));
        }
    // --

    // -- REGIMENES LABORALES
        findListaRegimenlab(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceRegimenlab + '/activos')
            .map((res: Response) => this.convertResponseMotcese(res));
        }
    // --

    // -- MODALIDAD CONTRATO
        findListaModContrato(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceModcontrato + '/activos')
            .map((res: Response) => this.convertResponseModContrato(res));
        }
    // --

// Convertir Fechas

        convertFechas(fecha: any): any {
            return this.dateUtils.toDate(fecha);
        }

    // CONVERT RESPONSE FORMATED ELEMENT DATES

        private convertResponseTipoDocIdentidad(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerTipoDoc(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerTipoDoc(json: any): Tipdocident {
            const entity: Tipdocident = Object.assign(new Tipdocident(), json);
            return entity;
        }

        private convertResponseDirPerNat(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDirPerNat(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDirPerNat(json: any): Dirpernat {
            const entity: Dirpernat = Object.assign(new Dirpernat(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseDirPerJuri(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDirPerJuri(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDirPerJuri(json: any): Dirperjuri {
            const entity: Dirperjuri = Object.assign(new Dirperjuri(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseAtencion(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerAtencion(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerAtencion(json: any): Atencion {
            const entity: Atencion = Object.assign(new Atencion(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseDatlab(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDatlab(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDatlab(json: any): Datlab {
            const entity: Datlab = Object.assign(new Datlab(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponsePase(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerPase(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerPase(json: any): Pasegl {
            const entity: Pasegl = Object.assign(new Pasegl(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseTrabajadorTrabajador(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerTrabajador(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerTrabajador(json: any): Trabajador {
            const entity: Trabajador = Object.assign(new Trabajador(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseMotateofi(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerMotateOfi(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerMotateOfi(json: any): Motatenofic {
            const entity: Motatenofic = Object.assign(new Motatenofic(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseMotateselec(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerMotateselec(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerMotateselec(json: any): Motateselec {
            const entity: Motateselec = Object.assign(new Motateselec(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseCargotrab(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerCargotrab(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerCargotrab(json: any): Cartrab {
            const entity: Cartrab = Object.assign(new Cartrab(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseAccionadop(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerAccionadop(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerAccionadop(json: any): Accionadop {
            const entity: Accionadop = Object.assign(new Accionadop(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseAccadoate(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerAccadoate(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerAccadoate(json: any): Accadoate {
            const entity: Accadoate = Object.assign(new Accadoate(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseDocpresate(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDocpresate(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDocpresate(json: any): Docpresate {
            const entity: Docpresate = Object.assign(new Docpresate(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseDocumento(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDocumento(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDocumento(json: any): Documento {
            const entity: Documento = Object.assign(new Documento(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseDocingper(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerDocingper(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerDocingper(json: any): Docinperdlb {
            const entity: Docinperdlb = Object.assign(new Docinperdlb(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseMotcese(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerMotcese(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerMotcese(json: any): Motcese {
            const entity: Motcese = Object.assign(new Motcese(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseRegimenlab(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerRegimenlab(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerRegimenlab(json: any): Regimenlab {
            const entity: Regimenlab = Object.assign(new Regimenlab(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseModContrato(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            const result = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                result.push(this.convertItemFromServerModContrato(jsonResponse[i]));
            }
            return new ResponseWrapper(res.headers, result, res.status);
        }
        private convertItemFromServerModContrato(json: any): Modcontrato {
            const entity: Modcontrato = Object.assign(new Modcontrato(), json);
            entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
            entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
            return entity;
        }

        private convertResponseUbigeo(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            return new ResponseWrapper(res.headers, jsonResponse, res.status);
        }

        private convertAtencion(atencion: Atencion): Atencion {
            const copy: Atencion = Object.assign({}, atencion);
            copy.tFecreg = this.dateUtils.toDate(atencion.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(atencion.tFecupd);
            return copy;
        }
        private convertDatlab(datlab: Datlab): Datlab {
            const copy: Datlab = Object.assign({}, datlab);
            copy.tFecreg = this.dateUtils.toDate(datlab.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(datlab.tFecupd);
            return copy;
        }
        private convertMotateselec(motateselec: Motateselec): Motateselec {
            const copy: Motateselec = Object.assign({}, motateselec);
            copy.tFecreg = this.dateUtils.toDate(motateselec.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(motateselec.tFecupd);
            return copy;
        }
        private convertAccadoate(accadoate: Accadoate): Accadoate {
            const copy: Accadoate = Object.assign({}, accadoate);
            copy.tFecreg = this.dateUtils.toDate(accadoate.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(accadoate.tFecupd);
            return copy;
        }
        private convertDocinperdlb(docinperdlb: Docinperdlb): Docinperdlb {
            const copy: Docinperdlb = Object.assign({}, docinperdlb);
            copy.tFecreg = this.dateUtils.toDate(docinperdlb.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(docinperdlb.tFecupd);
            return copy;
        }
        private convertDocpresate(docpresate: Docpresate): Docpresate {
            const copy: Docpresate = Object.assign({}, docpresate);
            copy.tFecreg = this.dateUtils.toDate(docpresate.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(docpresate.tFecupd);
            return copy;
        }
        private convertTrabajador(trabajador: Trabajador): Trabajador {
            const copy: Trabajador = Object.assign({}, trabajador);
            copy.tFecreg = this.dateUtils.toDate(trabajador.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(trabajador.tFecupd);
            return copy;
        }

    /**
     * Convert a Empleador to a JSON which can be sent to the server.
     */
    private convert(empleador: Empleador): Empleador {
        const copy: Empleador = Object.assign({}, empleador);

        copy.tFecreg = this.dateUtils.toDate(empleador.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(empleador.tFecupd);
        return copy;
    }

    private convertResponseEmpleadorEmpleador(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerEmpleador(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerEmpleador(json: any): Empleador {
        const entity: Empleador = Object.assign(new Empleador(), json);
        entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

        private convertDirPerNat(dirpernat: Dirpernat): Dirpernat {
            const copy: Dirpernat = Object.assign({}, dirpernat);
            copy.tFecreg = this.dateUtils.toDate(dirpernat.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(dirpernat.tFecupd);
            return copy;
        }
        private convertDirPerJuri(dirperjuri: Dirperjuri): Dirperjuri {
            const copy: Dirperjuri = Object.assign({}, dirperjuri);
            copy.tFecreg = this.dateUtils.toDate(dirperjuri.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(dirperjuri.tFecupd);
            return copy;
        }
        private convertMotivcese(motivcese: Motcese): Motcese {
            const copy: Motcese = Object.assign({}, motivcese);
            copy.tFecreg = this.dateUtils.toDate(motivcese.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(motivcese.tFecupd);
            return copy;
        }

}
