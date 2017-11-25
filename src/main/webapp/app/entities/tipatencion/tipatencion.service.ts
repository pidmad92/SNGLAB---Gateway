import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipatencion } from './tipatencion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipatencionService {

    private resourceUrl = '/consultas/api/tipatencions';
    private resourceSearchUrl = '/consultas/api/_search/tipatencions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipatencion: Tipatencion): Observable<Tipatencion> {
        const copy = this.convert(tipatencion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipatencion: Tipatencion): Observable<Tipatencion> {
        const copy = this.convert(tipatencion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipatencion> {
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
     * Convert a returned JSON object to Tipatencion.
     */
    private convertItemFromServer(json: any): Tipatencion {
        const entity: Tipatencion = Object.assign(new Tipatencion(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipatencion to a JSON which can be sent to the server.
     */
    private convert(tipatencion: Tipatencion): Tipatencion {
        const copy: Tipatencion = Object.assign({}, tipatencion);

        copy.tFecreg = this.dateUtils.toDate(tipatencion.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipatencion.tFecupd);
        return copy;
    }
}
