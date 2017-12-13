
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { Trabajador } from './trabajador.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';
import {ComboModel} from '../../general/combobox.model';

import { Tipdocident } from './tipdocident.model';

@Injectable()
export class AtencionTrabajadorService {

    private resourceTipoDoc = '/consultas/api/tipdocidents';
    private resourceUrl = '/consultas/api/trabajadors';
    private resourceUrlAtencion = '/consultas/api/atencions';
    private resourceSearchUrl = '/consultas/api/_search/trabajador';
    private resource_tipdocident_url = '/consultas/api/tipdocident';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(trabajador: Trabajador): Observable<Trabajador> {
        const copy = this.convert(trabajador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(trabajador: Trabajador): Observable<Trabajador> {
        const copy = this.convert(trabajador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Trabajador> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
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

// JH: inicio

    findTrabajadorByDocIdent(tipodoc: number, numdoc: String): Observable<Trabajador> {
        return this.http.get(`${this.resourceUrl}/tipdoc/${tipodoc}/numdoc/${numdoc}`)
            .map((res: Response) => {
                const jsonResponse = res.json();
                return this.convertItemFromServer(jsonResponse);
            });
    }
    findTrabajadorsByDocIdent(tipodoc: number, numdoc: String): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/tipdoc/${tipodoc}/numdocs/${numdoc}`)
            .map((res: Response) => this.convertResponse(res));
    }

    findTrabajadorsByName(nombres: String, apellidopat: String, apellidomat: String): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/nombres/${nombres}/apellidopat/${apellidopat}/apellidomat/${apellidomat}`)
            .map((res: Response) => this.convertResponse(res));
    }

    findAtencionsByTrabajador(id: String): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrlAtencion}/atenpase/trabajador/id/${id}`)
            .map((res: Response) => this.convertResponseAtencion(res));
    }
// JH: final

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponseAtencion(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerAtencion(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Atencion.
     */
    private convertItemFromServerAtencion(json: any): Atencion {
        const entity: Atencion = Object.assign(new Atencion(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to trabajador.
     */
    private convertItemFromServer(json: any): Trabajador {
        const entity: Trabajador = Object.assign(new Trabajador(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a trabajador to a JSON which can be sent to the server.
     */
    private convert(trabajador: Trabajador): Trabajador {
        const copy: Trabajador = Object.assign({}, trabajador);

        copy.tFecreg = this.dateUtils.toDate(trabajador.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(trabajador.tFecupd);
        return copy;
    }
}
