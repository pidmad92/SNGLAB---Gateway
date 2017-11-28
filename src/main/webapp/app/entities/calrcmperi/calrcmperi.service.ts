import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalrcmperiService {

    private resourceUrl = '/liquidaciones/api/calrcmperis';
    private resourceSearchUrl = '/liquidaciones/api/_search/calrcmperis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(calrcmperi: Calrcmperi): Observable<Calrcmperi> {
        const copy = this.convert(calrcmperi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(calrcmperi: Calrcmperi): Observable<Calrcmperi> {
        const copy = this.convert(calrcmperi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Calrcmperi> {
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
     * Convert a returned JSON object to Calrcmperi.
     */
    private convertItemFromServer(json: any): Calrcmperi {
        const entity: Calrcmperi = Object.assign(new Calrcmperi(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Calrcmperi to a JSON which can be sent to the server.
     */
    private convert(calrcmperi: Calrcmperi): Calrcmperi {
        const copy: Calrcmperi = Object.assign({}, calrcmperi);

        copy.tFecreg = this.dateUtils.toDate(calrcmperi.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(calrcmperi.tFecupd);
        return copy;
    }
}
