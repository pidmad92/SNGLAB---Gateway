import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../../shared';

import { Tipdocident } from '../../models/tipdocident.model';
import { Trabajador } from '../../models/trabajador.model';
import { Pernatural } from '../../models/pernatural.model';
import { Datlab } from '../../models/datlab.model';
import { Dirpernat } from './../../models/dirpernat.model';

import { ModalBusquedaTrabajadorService } from './modal-busqueda-trabajador.service';

@Injectable()
export class TrabajadorService {

    // private resource = '/liquidaciones/api/';
    private resource = '/liquidaciones/api/';

    // RUTAS POR ENTIDAD
    private resourceTipdocident = this.resource + 'tipdocidents';
    private resourceTrabajador  = this.resource + 'trabajadors';
    private resourceDatoslab    = this.resource + 'datlabs';
    private resourceDirpernats  = this.resource + 'dirpernats';
    private resourceDepa        = this.resource + 'departamentos';
    private resourceProv        = this.resource + 'provincias';
    private resourceDist        = this.resource + 'distritos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    // TIPO DE DOCUMENTO

    /**
     * Tipo de Documento de Identidad
     * @returns Observable
     */
    consultaTipoDocIdentidad(): Observable<ResponseWrapper> {
        // console.log('ConsService'); llego al servicio
        return this.http.get(this.resourceTipdocident, null)
            .map((res: Response) => this.convertResponseTipdocident(res));
    }

    // BUSQUEDA DEL TRABAJADOR CON TIPDOC Y NUMDOC

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

    /**
     * Buscar lista de trabajadores por tipo  de documento de identidad y nùmero de documento
     * @param  {number} tipodoc
     * @param  {String} numdoc
     * @returns Observable
     */
    findTrabajadorsByDocIdent(tipodoc: number, numdoc: String): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceTrabajador}/tipdoc/${tipodoc}/numdocs/${numdoc}`)
            .map((res: Response) => this.convertResponseTrabajadorTrabajador(res));
    }

    // BUSQUEDA DE DATOS LABORALES CON ID DEL Trabajador
    /**
     * Buscar lista de Datos Laborales por Id del trabajador
     * @param  {number} idTrabajador
     * @returns Observable
     */
     findDatlabsByIdTrabajador(idTrabajador: number): Observable<ResponseWrapper> {
         return this.http.get(`${this.resourceDatoslab}/registros/id_trabajador/${idTrabajador}`)
             .map((res: Response) => this.convertResponseDatlabDatlab(res));
     }

     // BUSQUEDA DIRECCIONES DEL Trabajador
     /**
      * Buscar lista de Direcciones por Id del trabajador
      * @param  {number} idTrabajador
      * @returns Observable
      */
     buscarDireccionesPerNat(idTrabajador: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceDirpernats}/trabajador/id/${idTrabajador}`)
          .map((res: Response) => this.convertResponseDirpernatsDirpernats(res));
     }

    // CONVERT RESPONSE FORMATED ELEMENT - Dirpernats
    convertResponseDirpernatsDirpernats(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    const result = [];
    for (let i = 0; i < jsonResponse.length; i++) {
        result.push(this.convertItemFromServerDirpernats(jsonResponse[i]));
    }
    return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerDirpernats(json: any): Dirpernat {
        const entity: Dirpernat = Object.assign(new Dirpernat(), json);
        entity.tFecreg = this.dateUtils.convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils.convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    // CONVERT RESPONSE FORMATED ELEMENT - Tipdocident

    private convertResponseTipdocident(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerTipdocident(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertItemFromServerTipdocident(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        return entity;
    }

    // CONVERT RESPONSE FORMATED ELEMENT - trabajador

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

        // CONVERT RESPONSE FORMATED ELEMENT - Datlab (Datos Laborales)

        private convertResponseDatlabDatlab(res: Response): ResponseWrapper {
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
          // ((entity.trabajador as Trabajador).pernatural as Pernatural).dFecnac = this.dateUtils.convertLocalDateFromServer(json.dFecnac);
          return entity;
        }

        consDep(req?: any): Observable<ResponseWrapper> {
            const options = createRequestOption(req);
            return this.http.get(this.resourceDepa, options)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
        consProv(id: string): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceProv}/${id}`)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
        consDis(id: string, idprov: string): Observable<ResponseWrapper> {
            return this.http.get(`${this.resourceDist}/${id}/${idprov}`)
                .map((res: Response) => this.convertResponseUbigeo(res));
        }
        private convertResponseUbigeo(res: Response): ResponseWrapper {
            const jsonResponse = res.json();
            return new ResponseWrapper(res.headers, jsonResponse, res.status);
        }

}
