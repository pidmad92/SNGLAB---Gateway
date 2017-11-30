import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasepj } from './pasepj.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PasepjService {

    private resourceUrl = '/patrocinio/api/pasepjs';
    private resourceSearchUrl = '/patrocinio/api/_search/pasepjs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pasepj: Pasepj): Observable<Pasepj> {
        const copy = this.convert(pasepj);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pasepj: Pasepj): Observable<Pasepj> {
        const copy = this.convert(pasepj);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pasepj> {
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
     * Convert a returned JSON object to Pasepj.
     */
    private convertItemFromServer(json: any): Pasepj {
        const entity: Pasepj = Object.assign(new Pasepj(), json);
        entity.dFecpas = this.dateUtils
            .convertLocalDateFromServer(json.dFecpas);
        entity.dFecrecep = this.dateUtils
            .convertLocalDateFromServer(json.dFecrecep);
        entity.dFecmod = this.dateUtils
            .convertLocalDateFromServer(json.dFecmod);
        entity.dFecdes = this.dateUtils
            .convertLocalDateFromServer(json.dFecdes);
        entity.dFeccon = this.dateUtils
            .convertLocalDateFromServer(json.dFeccon);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Pasepj to a JSON which can be sent to the server.
     */
    private convert(pasepj: Pasepj): Pasepj {
        const copy: Pasepj = Object.assign({}, pasepj);
        copy.dFecpas = this.dateUtils
            .convertLocalDateToServer(pasepj.dFecpas);
        copy.dFecrecep = this.dateUtils
            .convertLocalDateToServer(pasepj.dFecrecep);
        copy.dFecmod = this.dateUtils
            .convertLocalDateToServer(pasepj.dFecmod);
        copy.dFecdes = this.dateUtils
            .convertLocalDateToServer(pasepj.dFecdes);
        copy.dFeccon = this.dateUtils
            .convertLocalDateToServer(pasepj.dFeccon);

        copy.tFecreg = this.dateUtils.toDate(pasepj.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(pasepj.tFecupd);
        return copy;
    }
}
