import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Conciliacion } from './conciliacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ConciliacionService {

    private resourceUrl = '/defensa/api/conciliacions';
    private resourceSearchUrl = '/defensa/api/_search/conciliacions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(conciliacion: Conciliacion): Observable<Conciliacion> {
        const copy = this.convert(conciliacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(conciliacion: Conciliacion): Observable<Conciliacion> {
        const copy = this.convert(conciliacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Conciliacion> {
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
     * Convert a returned JSON object to Conciliacion.
     */
    private convertItemFromServer(json: any): Conciliacion {
        const entity: Conciliacion = Object.assign(new Conciliacion(), json);
        entity.dFecha = this.dateUtils
            .convertDateTimeFromServer(json.dFecha);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Conciliacion to a JSON which can be sent to the server.
     */
    private convert(conciliacion: Conciliacion): Conciliacion {
        const copy: Conciliacion = Object.assign({}, conciliacion);

        copy.dFecha = this.dateUtils.toDate(conciliacion.dFecha);

        copy.dFechareg = this.dateUtils.toDate(conciliacion.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(conciliacion.dFechaupd);
        return copy;
    }
}
