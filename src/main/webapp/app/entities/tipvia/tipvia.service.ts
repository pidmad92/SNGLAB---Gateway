import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipvia } from './tipvia.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipviaService {

    private resourceUrl = '/denuncias/api/tipvias';
    private resourceSearchUrl = '/denuncias/api/_search/tipvias';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipvia: Tipvia): Observable<Tipvia> {
        const copy = this.convert(tipvia);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipvia: Tipvia): Observable<Tipvia> {
        const copy = this.convert(tipvia);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipvia> {
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
     * Convert a returned JSON object to Tipvia.
     */
    private convertItemFromServer(json: any): Tipvia {
        const entity: Tipvia = Object.assign(new Tipvia(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipvia to a JSON which can be sent to the server.
     */
    private convert(tipvia: Tipvia): Tipvia {
        const copy: Tipvia = Object.assign({}, tipvia);

        copy.tFecreg = this.dateUtils.toDate(tipvia.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipvia.tFecupd);
        return copy;
    }
}
