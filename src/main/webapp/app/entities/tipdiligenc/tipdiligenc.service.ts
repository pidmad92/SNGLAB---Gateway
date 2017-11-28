import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipdiligenc } from './tipdiligenc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipdiligencService {

    private resourceUrl = '/patrocinio/api/tipdiligencs';
    private resourceSearchUrl = '/patrocinio/api/_search/tipdiligencs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipdiligenc: Tipdiligenc): Observable<Tipdiligenc> {
        const copy = this.convert(tipdiligenc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipdiligenc: Tipdiligenc): Observable<Tipdiligenc> {
        const copy = this.convert(tipdiligenc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipdiligenc> {
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
     * Convert a returned JSON object to Tipdiligenc.
     */
    private convertItemFromServer(json: any): Tipdiligenc {
        const entity: Tipdiligenc = Object.assign(new Tipdiligenc(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipdiligenc to a JSON which can be sent to the server.
     */
    private convert(tipdiligenc: Tipdiligenc): Tipdiligenc {
        const copy: Tipdiligenc = Object.assign({}, tipdiligenc);

        copy.tFecreg = this.dateUtils.toDate(tipdiligenc.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipdiligenc.tFecupd);
        return copy;
    }
}
