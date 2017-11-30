import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Juntadirect } from './juntadirect.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JuntadirectService {

    private resourceUrl = '/sindicatos/api/juntadirects';
    private resourceSearchUrl = '/sindicatos/api/_search/juntadirects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(juntadirect: Juntadirect): Observable<Juntadirect> {
        const copy = this.convert(juntadirect);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(juntadirect: Juntadirect): Observable<Juntadirect> {
        const copy = this.convert(juntadirect);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Juntadirect> {
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
     * Convert a returned JSON object to Juntadirect.
     */
    private convertItemFromServer(json: any): Juntadirect {
        const entity: Juntadirect = Object.assign(new Juntadirect(), json);
        entity.tFecinicio = this.dateUtils
            .convertDateTimeFromServer(json.tFecinicio);
        entity.tFecrfinal = this.dateUtils
            .convertDateTimeFromServer(json.tFecrfinal);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Juntadirect to a JSON which can be sent to the server.
     */
    private convert(juntadirect: Juntadirect): Juntadirect {
        const copy: Juntadirect = Object.assign({}, juntadirect);

        copy.tFecinicio = this.dateUtils.toDate(juntadirect.tFecinicio);

        copy.tFecrfinal = this.dateUtils.toDate(juntadirect.tFecrfinal);

        copy.tFecreg = this.dateUtils.toDate(juntadirect.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(juntadirect.tFecupd);
        return copy;
    }
}
