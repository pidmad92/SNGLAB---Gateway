import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Segsalud } from './segsalud.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SegsaludService {

    private resourceUrl = '/liquidaciones/api/segsaluds';
    private resourceSearchUrl = '/liquidaciones/api/_search/segsaluds';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(segsalud: Segsalud): Observable<Segsalud> {
        const copy = this.convert(segsalud);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(segsalud: Segsalud): Observable<Segsalud> {
        const copy = this.convert(segsalud);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Segsalud> {
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
     * Convert a returned JSON object to Segsalud.
     */
    private convertItemFromServer(json: any): Segsalud {
        const entity: Segsalud = Object.assign(new Segsalud(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Segsalud to a JSON which can be sent to the server.
     */
    private convert(segsalud: Segsalud): Segsalud {
        const copy: Segsalud = Object.assign({}, segsalud);

        copy.tFecreg = this.dateUtils.toDate(segsalud.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(segsalud.tFecupd);
        return copy;
    }
}
