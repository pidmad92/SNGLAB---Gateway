import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipconrem } from './tipconrem.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipconremService {

    private resourceUrl = '/liquidaciones/api/tipconrems';
    private resourceSearchUrl = '/liquidaciones/api/_search/tipconrems';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipconrem: Tipconrem): Observable<Tipconrem> {
        const copy = this.convert(tipconrem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipconrem: Tipconrem): Observable<Tipconrem> {
        const copy = this.convert(tipconrem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipconrem> {
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
     * Convert a returned JSON object to Tipconrem.
     */
    private convertItemFromServer(json: any): Tipconrem {
        const entity: Tipconrem = Object.assign(new Tipconrem(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipconrem to a JSON which can be sent to the server.
     */
    private convert(tipconrem: Tipconrem): Tipconrem {
        const copy: Tipconrem = Object.assign({}, tipconrem);

        copy.tFecreg = this.dateUtils.toDate(tipconrem.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipconrem.tFecupd);
        return copy;
    }
}
