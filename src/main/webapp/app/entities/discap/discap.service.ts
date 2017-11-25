import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Discap } from './discap.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DiscapService {

    private resourceUrl = '/consultas/api/discaps';
    private resourceSearchUrl = '/consultas/api/_search/discaps';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(discap: Discap): Observable<Discap> {
        const copy = this.convert(discap);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(discap: Discap): Observable<Discap> {
        const copy = this.convert(discap);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Discap> {
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
     * Convert a returned JSON object to Discap.
     */
    private convertItemFromServer(json: any): Discap {
        const entity: Discap = Object.assign(new Discap(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Discap to a JSON which can be sent to the server.
     */
    private convert(discap: Discap): Discap {
        const copy: Discap = Object.assign({}, discap);

        copy.tFecreg = this.dateUtils.toDate(discap.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(discap.tFecupd);
        return copy;
    }
}
