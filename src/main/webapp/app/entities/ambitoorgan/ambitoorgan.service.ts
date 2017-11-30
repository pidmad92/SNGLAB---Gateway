import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Ambitoorgan } from './ambitoorgan.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AmbitoorganService {

    private resourceUrl = '/sindicatos/api/ambitoorgans';
    private resourceSearchUrl = '/sindicatos/api/_search/ambitoorgans';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ambitoorgan: Ambitoorgan): Observable<Ambitoorgan> {
        const copy = this.convert(ambitoorgan);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ambitoorgan: Ambitoorgan): Observable<Ambitoorgan> {
        const copy = this.convert(ambitoorgan);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ambitoorgan> {
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
     * Convert a returned JSON object to Ambitoorgan.
     */
    private convertItemFromServer(json: any): Ambitoorgan {
        const entity: Ambitoorgan = Object.assign(new Ambitoorgan(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Ambitoorgan to a JSON which can be sent to the server.
     */
    private convert(ambitoorgan: Ambitoorgan): Ambitoorgan {
        const copy: Ambitoorgan = Object.assign({}, ambitoorgan);

        copy.tFecreg = this.dateUtils.toDate(ambitoorgan.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(ambitoorgan.tFecupd);
        return copy;
    }
}
