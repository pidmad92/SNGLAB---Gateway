import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipcalperi } from './tipcalperi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipcalperiService {

    private resourceUrl = '/liquidaciones/api/tipcalperis';
    private resourceSearchUrl = '/liquidaciones/api/_search/tipcalperis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipcalperi: Tipcalperi): Observable<Tipcalperi> {
        const copy = this.convert(tipcalperi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipcalperi: Tipcalperi): Observable<Tipcalperi> {
        const copy = this.convert(tipcalperi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipcalperi> {
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
     * Convert a returned JSON object to Tipcalperi.
     */
    private convertItemFromServer(json: any): Tipcalperi {
        const entity: Tipcalperi = Object.assign(new Tipcalperi(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipcalperi to a JSON which can be sent to the server.
     */
    private convert(tipcalperi: Tipcalperi): Tipcalperi {
        const copy: Tipcalperi = Object.assign({}, tipcalperi);

        copy.tFecreg = this.dateUtils.toDate(tipcalperi.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipcalperi.tFecupd);
        return copy;
    }
}
