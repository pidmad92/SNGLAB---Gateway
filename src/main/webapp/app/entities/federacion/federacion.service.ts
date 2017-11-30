import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Federacion } from './federacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FederacionService {

    private resourceUrl = '/sindicatos/api/federacions';
    private resourceSearchUrl = '/sindicatos/api/_search/federacions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(federacion: Federacion): Observable<Federacion> {
        const copy = this.convert(federacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(federacion: Federacion): Observable<Federacion> {
        const copy = this.convert(federacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Federacion> {
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
     * Convert a returned JSON object to Federacion.
     */
    private convertItemFromServer(json: any): Federacion {
        const entity: Federacion = Object.assign(new Federacion(), json);
        entity.tFecafilia = this.dateUtils
            .convertDateTimeFromServer(json.tFecafilia);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Federacion to a JSON which can be sent to the server.
     */
    private convert(federacion: Federacion): Federacion {
        const copy: Federacion = Object.assign({}, federacion);

        copy.tFecafilia = this.dateUtils.toDate(federacion.tFecafilia);

        copy.tFecreg = this.dateUtils.toDate(federacion.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(federacion.tFecupd);
        return copy;
    }
}
