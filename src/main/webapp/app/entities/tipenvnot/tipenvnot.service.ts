import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipenvnot } from './tipenvnot.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipenvnotService {

    private resourceUrl = '/defensa/api/tipenvnots';
    private resourceSearchUrl = '/defensa/api/_search/tipenvnots';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipenvnot: Tipenvnot): Observable<Tipenvnot> {
        const copy = this.convert(tipenvnot);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipenvnot: Tipenvnot): Observable<Tipenvnot> {
        const copy = this.convert(tipenvnot);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipenvnot> {
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
     * Convert a returned JSON object to Tipenvnot.
     */
    private convertItemFromServer(json: any): Tipenvnot {
        const entity: Tipenvnot = Object.assign(new Tipenvnot(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipenvnot to a JSON which can be sent to the server.
     */
    private convert(tipenvnot: Tipenvnot): Tipenvnot {
        const copy: Tipenvnot = Object.assign({}, tipenvnot);

        copy.tFecreg = this.dateUtils.toDate(tipenvnot.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipenvnot.tFecupd);
        return copy;
    }
}
