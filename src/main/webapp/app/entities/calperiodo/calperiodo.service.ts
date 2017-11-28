import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Calperiodo } from './calperiodo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalperiodoService {

    private resourceUrl = '/liquidaciones/api/calperiodos';
    private resourceSearchUrl = '/liquidaciones/api/_search/calperiodos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(calperiodo: Calperiodo): Observable<Calperiodo> {
        const copy = this.convert(calperiodo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(calperiodo: Calperiodo): Observable<Calperiodo> {
        const copy = this.convert(calperiodo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Calperiodo> {
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
     * Convert a returned JSON object to Calperiodo.
     */
    private convertItemFromServer(json: any): Calperiodo {
        const entity: Calperiodo = Object.assign(new Calperiodo(), json);
        entity.tFecini = this.dateUtils
            .convertLocalDateFromServer(json.tFecini);
        entity.tFecfin = this.dateUtils
            .convertLocalDateFromServer(json.tFecfin);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Calperiodo to a JSON which can be sent to the server.
     */
    private convert(calperiodo: Calperiodo): Calperiodo {
        const copy: Calperiodo = Object.assign({}, calperiodo);
        copy.tFecini = this.dateUtils
            .convertLocalDateToServer(calperiodo.tFecini);
        copy.tFecfin = this.dateUtils
            .convertLocalDateToServer(calperiodo.tFecfin);

        copy.tFecreg = this.dateUtils.toDate(calperiodo.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(calperiodo.tFecupd);
        return copy;
    }
}
