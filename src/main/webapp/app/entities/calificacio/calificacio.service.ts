import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Calificacio } from './calificacio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalificacioService {

    private resourceUrl = '/sindicatos/api/calificacios';
    private resourceSearchUrl = '/sindicatos/api/_search/calificacios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(calificacio: Calificacio): Observable<Calificacio> {
        const copy = this.convert(calificacio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(calificacio: Calificacio): Observable<Calificacio> {
        const copy = this.convert(calificacio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Calificacio> {
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
     * Convert a returned JSON object to Calificacio.
     */
    private convertItemFromServer(json: any): Calificacio {
        const entity: Calificacio = Object.assign(new Calificacio(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Calificacio to a JSON which can be sent to the server.
     */
    private convert(calificacio: Calificacio): Calificacio {
        const copy: Calificacio = Object.assign({}, calificacio);

        copy.tFecreg = this.dateUtils.toDate(calificacio.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(calificacio.tFecupd);
        return copy;
    }
}
