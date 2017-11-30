import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Organizacio } from './organizacio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrganizacioService {

    private resourceUrl = '/sindicatos/api/organizacios';
    private resourceSearchUrl = '/sindicatos/api/_search/organizacios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(organizacio: Organizacio): Observable<Organizacio> {
        const copy = this.convert(organizacio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(organizacio: Organizacio): Observable<Organizacio> {
        const copy = this.convert(organizacio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Organizacio> {
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
     * Convert a returned JSON object to Organizacio.
     */
    private convertItemFromServer(json: any): Organizacio {
        const entity: Organizacio = Object.assign(new Organizacio(), json);
        entity.tFecregist = this.dateUtils
            .convertDateTimeFromServer(json.tFecregist);
        entity.tFecpresen = this.dateUtils
            .convertDateTimeFromServer(json.tFecpresen);
        entity.tFecconsta = this.dateUtils
            .convertDateTimeFromServer(json.tFecconsta);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Organizacio to a JSON which can be sent to the server.
     */
    private convert(organizacio: Organizacio): Organizacio {
        const copy: Organizacio = Object.assign({}, organizacio);

        copy.tFecregist = this.dateUtils.toDate(organizacio.tFecregist);

        copy.tFecpresen = this.dateUtils.toDate(organizacio.tFecpresen);

        copy.tFecconsta = this.dateUtils.toDate(organizacio.tFecconsta);

        copy.tFecreg = this.dateUtils.toDate(organizacio.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(organizacio.tFecupd);
        return copy;
    }
}
