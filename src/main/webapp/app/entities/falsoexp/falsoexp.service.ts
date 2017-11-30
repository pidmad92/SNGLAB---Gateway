import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Falsoexp } from './falsoexp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FalsoexpService {

    private resourceUrl = '/patrocinio/api/falsoexps';
    private resourceSearchUrl = '/patrocinio/api/_search/falsoexps';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(falsoexp: Falsoexp): Observable<Falsoexp> {
        const copy = this.convert(falsoexp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(falsoexp: Falsoexp): Observable<Falsoexp> {
        const copy = this.convert(falsoexp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Falsoexp> {
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
     * Convert a returned JSON object to Falsoexp.
     */
    private convertItemFromServer(json: any): Falsoexp {
        const entity: Falsoexp = Object.assign(new Falsoexp(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Falsoexp to a JSON which can be sent to the server.
     */
    private convert(falsoexp: Falsoexp): Falsoexp {
        const copy: Falsoexp = Object.assign({}, falsoexp);

        copy.tFecreg = this.dateUtils.toDate(falsoexp.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(falsoexp.tFecupd);
        return copy;
    }
}
