import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipzona } from './tipzona.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipzonaService {

    private resourceUrl = '/denuncias/api/tipzonas';
    private resourceSearchUrl = '/denuncias/api/_search/tipzonas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipzona: Tipzona): Observable<Tipzona> {
        const copy = this.convert(tipzona);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipzona: Tipzona): Observable<Tipzona> {
        const copy = this.convert(tipzona);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipzona> {
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
     * Convert a returned JSON object to Tipzona.
     */
    private convertItemFromServer(json: any): Tipzona {
        const entity: Tipzona = Object.assign(new Tipzona(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipzona to a JSON which can be sent to the server.
     */
    private convert(tipzona: Tipzona): Tipzona {
        const copy: Tipzona = Object.assign({}, tipzona);

        copy.tFecreg = this.dateUtils.toDate(tipzona.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipzona.tFecupd);
        return copy;
    }
}
