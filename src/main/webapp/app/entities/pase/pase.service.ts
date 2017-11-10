import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pase } from './pase.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PaseService {

    private resourceUrl = '/consultas/api/pases';
    private resourceSearchUrl = '/consultas/api/_search/pases';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pase: Pase): Observable<Pase> {
        const copy = this.convert(pase);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pase: Pase): Observable<Pase> {
        const copy = this.convert(pase);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pase> {
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
     * Convert a returned JSON object to Pase.
     */
    private convertItemFromServer(json: any): Pase {
        const entity: Pase = Object.assign(new Pase(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Pase to a JSON which can be sent to the server.
     */
    private convert(pase: Pase): Pase {
        const copy: Pase = Object.assign({}, pase);

        copy.dFechareg = this.dateUtils.toDate(pase.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(pase.dFechaupd);
        return copy;
    }
}
