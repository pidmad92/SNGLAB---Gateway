import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Recurso } from './recurso.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RecursoService {

    private resourceUrl = '/sindicatos/api/recursos';
    private resourceSearchUrl = '/sindicatos/api/_search/recursos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(recurso: Recurso): Observable<Recurso> {
        const copy = this.convert(recurso);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(recurso: Recurso): Observable<Recurso> {
        const copy = this.convert(recurso);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Recurso> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

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
     * Convert a returned JSON object to Recurso.
     */
    private convertItemFromServer(json: any): Recurso {
        const entity: Recurso = Object.assign(new Recurso(), json);
        entity.tFecrecurs = this.dateUtils
            .convertDateTimeFromServer(json.tFecrecurs);
        entity.tFecprovei = this.dateUtils
            .convertDateTimeFromServer(json.tFecprovei);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Recurso to a JSON which can be sent to the server.
     */
    private convert(recurso: Recurso): Recurso {
        const copy: Recurso = Object.assign({}, recurso);

        copy.tFecrecurs = this.dateUtils.toDate(recurso.tFecrecurs);

        copy.tFecprovei = this.dateUtils.toDate(recurso.tFecprovei);

        copy.tFecreg = this.dateUtils.toDate(recurso.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(recurso.tFecupd);
        return copy;
    }
}
