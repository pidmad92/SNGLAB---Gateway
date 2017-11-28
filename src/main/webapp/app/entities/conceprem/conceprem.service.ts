import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Conceprem } from './conceprem.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ConcepremService {

    private resourceUrl = '/liquidaciones/api/conceprems';
    private resourceSearchUrl = '/liquidaciones/api/_search/conceprems';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(conceprem: Conceprem): Observable<Conceprem> {
        const copy = this.convert(conceprem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(conceprem: Conceprem): Observable<Conceprem> {
        const copy = this.convert(conceprem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Conceprem> {
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
     * Convert a returned JSON object to Conceprem.
     */
    private convertItemFromServer(json: any): Conceprem {
        const entity: Conceprem = Object.assign(new Conceprem(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Conceprem to a JSON which can be sent to the server.
     */
    private convert(conceprem: Conceprem): Conceprem {
        const copy: Conceprem = Object.assign({}, conceprem);

        copy.tFecreg = this.dateUtils.toDate(conceprem.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(conceprem.tFecupd);
        return copy;
    }
}
