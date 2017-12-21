
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { Dirpernat } from './dirpernat.model';
import { Dirperjuri } from './dirperjuri.model';
import { Trabajador } from './trabajador.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import {ComboModel} from '../../general/combobox.model';

import { Tipdocident } from './tipdocident.model';

@Injectable()
export class AtencionTrabajadorService {

    private resource = '/consultas/api/';

    // RUTAS POR MODELO DE ACUERDO AL TIPO DE ENTIDAD
    private resourceAtencion    = this.resource + 'atencions';
    private resourceTipoDoc     = this.resource + 'tipdocidents';
    private resourceTrabajador  = this.resource + 'trabajadors';
    private resourceEmpleador   = this.resource + 'empleadors';
    private resourceDPerNat     = this.resource + 'dirpernats';
    private resourceDPerJuri    = this.resource + 'dirperjuris';

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

    // ATENCION

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

        private convertResponseUbigeo(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            return new ResponseWrapper(res.headers, jsonResponse, res.status);
        }

        private convertTrabajador(trabajador: Trabajador): Trabajador {
            const copy: Trabajador = Object.assign({}, trabajador);
            copy.tFecreg = this.dateUtils.toDate(trabajador.tFecreg);
            copy.tFecupd = this.dateUtils.toDate(trabajador.tFecupd);
            return copy;
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
}
