import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasegl } from '../models/pasegl.model';
import { Atencion } from '../models/atencion.model';
import { Empleador } from '../models/empleador.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import {ComboModel} from '../../general/combobox.model';
import { Tipdocident } from '../models/tipdocident.model';
import { Dirpernat } from '../models/dirpernat.model';
import { Dirperjuri } from '../models/dirperjuri.model';
import { Trabajador } from '../models/trabajador.model';

import { Motatenofic } from '../models/motatenofic.model';
import { Motateselec } from '../models/motateselec.model';
import { Accionadop } from '../models/accionadop.model';
import { Docpresate } from '../models/docpresate.model';
import { Docinperdlb } from '../models/docinperdlb.model';
import { Docingrper } from '../models/docingrper.model';
import { Cartrab } from '../models/cartrab.model';
import { Regimenlab } from '../models/regimenlab.model';
import { Motcese } from '../models/motcese.model';

@Injectable()
export class AtencionEmpleadorService {

    private resource = '/consultas/api/';

// RUTAS POR ENTIDAD
    private resourcePasegl    = this.resource + 'pasegls';
    private resourceAtencion    = this.resource + 'atencions';
    private resourceTipoDoc     = this.resource + 'tipdocidents';
    private resourceTrabajador  = this.resource + 'trabajadors';
    private resourceEmpleador   = this.resource + 'empleadors';
    private resourceDPerNat     = this.resource + 'dirpernats';
    private resourceDPerJuri    = this.resource + 'dirperjuris';
    private resourceMotateOfi   = this.resource + 'motatenofics';
    private resourceMotateSelec = this.resource + 'motateselecs';
    private resourceDocpresa    = this.resource + 'docpresates';
    private resourceDocingper   = this.resource + 'docinperdlbs';
    private resourceDocingtot   = this.resource + 'docingrpers';
    private resourceCargoTrab   = this.resource + 'cartrabs';
    private resourceAccionadop  = this.resource + 'accionadops';
    private resourceMotcese     = this.resource + 'motcese';
    private resourceRegimenlab  = this.resource + 'regimenlabs';

// RUTAS DE UBIGEO
    private resourceDepa = this.resource + 'departamentos';
    private resourceProv = this.resource + 'provincias';
    private resourceDist = this.resource + 'distritos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

// UBIGEO

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

// TIPO DE DOCUMENTO

    /**
     * Tipo de Documento de Identidad
     * @returns Observable
     */
    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceTipoDoc, null)
            .map((res: Response) => this.convertResponseTipoDocIdentidad(res));
    }

// DIRECCIONES PERSONA NATURAL

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
         * Grabar dirección persona natural
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
         * Actualizar dirección persona natural
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

// DIRECCIONES PERSONA JURÍDICA

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
         * Grabar dirección persona jurìdica
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
         * Grabar direccón persona jurìdica
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
        findEmpleadorsByDocIdent(tipodoc: number, numdoc: String): Observable<Empleador> {
            return this.http.get(`${this.resourceEmpleador}/tipdoc/${tipodoc}/numdoc/${numdoc}`)
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

        /**
         * Buscar atencìón por código
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
         * Buscar Atenciones por código de trabajador
         * @param  {String} id
         * @returns Observable
         */
        findAtencionsByTrabajador(id: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceAtencion}/atenpase/trabajador/id/${id}`)
                .map((res: Response) => this.convertResponseAtencion(res));
        }

        /**
         * Buscar Atenciones por código de trabajador
         * @param  {String} id
         * @returns Observable
         */
        findAtencionsByEmpleador(id: String): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceAtencion}/empleador/id/${id}`)
                .map((res: Response) => this.convertResponseAtencion(res));
        }

// PASES

        /**
         * Buscar Pases por código de Empleador
         * @param  {String} id
         * @returns Observable
         */
        findPasesByEmpleador(id: number): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourcePasegl}/pases/empleador/${id}/oficina/5/estado/1`)
                .map((res: Response) => this.convertResponsePase(res));
        }

// TRABAJADORES

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

// -- MOTIVOS SELECCIONADOS
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

// -- lISTAR LOS DOCUMENTOS PRESENTADOS
        findListaDocpresate(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocpresa)
            .map((res: Response) => this.convertResponseDocpresate(res));
        }

// -- lISTAR LOS CARGOS DE TRABAJADOR
        findListaCartrab(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceCargoTrab)
            .map((res: Response) => this.convertResponseCargotrab(res));
        }

// -- lISTAR LOS ACCIONES ADOPTADAS
        findListaAccionadop(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceAccionadop)
            .map((res: Response) => this.convertResponseAccionadop(res));
        }

// -- LISTAR DE DOCUMENTO DE INGRESOS
        findListaDocumentosPercibidosActivos(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocingtot + '/activos')
            .map((res: Response) => this.convertResponseDocingper(res));
        }

// -- lISTAR LOS DOCUMENTOS DE INGRESOS PERCIBIDOS
        findListaDocumentosPercibidosSelec(): Observable<ResponseWrapper> {
            return this.http.get(this.resourceDocingper)
            .map((res: Response) => this.convertResponseDocingper(res));
        }

// -- lISTAR LOS MOTIVOS DE CESE
    findListaMotivcese(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceMotcese + '/activos')
        .map((res: Response) => this.convertResponseMotcese(res));
    }

// -- lISTAR LOS REGIMENES LABORALES
    findListaRegimenlab(): Observable<ResponseWrapper> {
        return this.http.get(this.resourceRegimenlab + '/activos')
        .map((res: Response) => this.convertResponseMotcese(res));
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

    private convertResponseUbigeo(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
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

    /**
     * Convert a returned JSON object to Empleador.
     */
    private convertItemFromServer(json: any): Empleador {
        const entity: Empleador = Object.assign(new Empleador(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }
}
