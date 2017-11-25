import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Cartrab } from './cartrab.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CartrabService {

    private resourceUrl = '/consultas/api/cartrabs';
    private resourceSearchUrl = '/consultas/api/_search/cartrabs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(cartrab: Cartrab): Observable<Cartrab> {
        const copy = this.convert(cartrab);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cartrab: Cartrab): Observable<Cartrab> {
        const copy = this.convert(cartrab);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Cartrab> {
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
     * Convert a returned JSON object to Cartrab.
     */
    private convertItemFromServer(json: any): Cartrab {
        const entity: Cartrab = Object.assign(new Cartrab(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Cartrab to a JSON which can be sent to the server.
     */
    private convert(cartrab: Cartrab): Cartrab {
        const copy: Cartrab = Object.assign({}, cartrab);

        copy.tFecreg = this.dateUtils.toDate(cartrab.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(cartrab.tFecupd);
        return copy;
    }
}
