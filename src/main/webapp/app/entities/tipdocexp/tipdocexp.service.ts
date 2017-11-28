import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipdocexp } from './tipdocexp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipdocexpService {

    private resourceUrl = '/defensa/api/tipdocexps';
    private resourceSearchUrl = '/defensa/api/_search/tipdocexps';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipdocexp: Tipdocexp): Observable<Tipdocexp> {
        const copy = this.convert(tipdocexp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipdocexp: Tipdocexp): Observable<Tipdocexp> {
        const copy = this.convert(tipdocexp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipdocexp> {
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
     * Convert a returned JSON object to Tipdocexp.
     */
    private convertItemFromServer(json: any): Tipdocexp {
        const entity: Tipdocexp = Object.assign(new Tipdocexp(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipdocexp to a JSON which can be sent to the server.
     */
    private convert(tipdocexp: Tipdocexp): Tipdocexp {
        const copy: Tipdocexp = Object.assign({}, tipdocexp);

        copy.tFecreg = this.dateUtils.toDate(tipdocexp.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipdocexp.tFecupd);
        return copy;
    }
}
