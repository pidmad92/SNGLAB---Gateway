import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Librosindic } from './librosindic.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LibrosindicService {

    private resourceUrl = '/sindicatos/api/librosindics';
    private resourceSearchUrl = '/sindicatos/api/_search/librosindics';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(librosindic: Librosindic): Observable<Librosindic> {
        const copy = this.convert(librosindic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(librosindic: Librosindic): Observable<Librosindic> {
        const copy = this.convert(librosindic);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Librosindic> {
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
     * Convert a returned JSON object to Librosindic.
     */
    private convertItemFromServer(json: any): Librosindic {
        const entity: Librosindic = Object.assign(new Librosindic(), json);
        entity.tFecresolu = this.dateUtils
            .convertDateTimeFromServer(json.tFecresolu);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Librosindic to a JSON which can be sent to the server.
     */
    private convert(librosindic: Librosindic): Librosindic {
        const copy: Librosindic = Object.assign({}, librosindic);

        copy.tFecresolu = this.dateUtils.toDate(librosindic.tFecresolu);

        copy.tFecreg = this.dateUtils.toDate(librosindic.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(librosindic.tFecupd);
        return copy;
    }
}
