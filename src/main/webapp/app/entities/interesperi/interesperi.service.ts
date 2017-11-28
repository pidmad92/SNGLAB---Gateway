import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Interesperi } from './interesperi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InteresperiService {

    private resourceUrl = '/liquidaciones/api/interesperis';
    private resourceSearchUrl = '/liquidaciones/api/_search/interesperis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(interesperi: Interesperi): Observable<Interesperi> {
        const copy = this.convert(interesperi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(interesperi: Interesperi): Observable<Interesperi> {
        const copy = this.convert(interesperi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Interesperi> {
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
     * Convert a returned JSON object to Interesperi.
     */
    private convertItemFromServer(json: any): Interesperi {
        const entity: Interesperi = Object.assign(new Interesperi(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Interesperi to a JSON which can be sent to the server.
     */
    private convert(interesperi: Interesperi): Interesperi {
        const copy: Interesperi = Object.assign({}, interesperi);

        copy.tFecreg = this.dateUtils.toDate(interesperi.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(interesperi.tFecupd);
        return copy;
    }
}
