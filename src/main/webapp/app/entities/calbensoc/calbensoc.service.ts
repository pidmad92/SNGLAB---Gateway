import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Calbensoc } from './calbensoc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CalbensocService {

    private resourceUrl = '/liquidaciones/api/calbensocs';
    private resourceSearchUrl = '/liquidaciones/api/_search/calbensocs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(calbensoc: Calbensoc): Observable<Calbensoc> {
        const copy = this.convert(calbensoc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(calbensoc: Calbensoc): Observable<Calbensoc> {
        const copy = this.convert(calbensoc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Calbensoc> {
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
     * Convert a returned JSON object to Calbensoc.
     */
    private convertItemFromServer(json: any): Calbensoc {
        const entity: Calbensoc = Object.assign(new Calbensoc(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Calbensoc to a JSON which can be sent to the server.
     */
    private convert(calbensoc: Calbensoc): Calbensoc {
        const copy: Calbensoc = Object.assign({}, calbensoc);

        copy.tFecreg = this.dateUtils.toDate(calbensoc.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(calbensoc.tFecupd);
        return copy;
    }
}
