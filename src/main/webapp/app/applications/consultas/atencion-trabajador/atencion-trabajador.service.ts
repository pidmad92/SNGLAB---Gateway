import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { ResponseWrapper, createRequestOption } from '../../../shared';

import { Tipdocident } from './tipdocident.model';

@Injectable()
export class AtencionTrabajadorService {

    private resourceUrl = '/consultas/api/trabajador';
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

// JH: inicio
    findTrabajadorByDocIdent(tipodoc: number, numdoc: String): Observable<Trabajador> {
        return this.http.get(`${this.resourceUrl}/tipdoc/${tipodoc}/numdoc/${numdoc}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
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
