import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Activecono } from './activecono.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ActiveconoService {

    private resourceUrl = '/consultas/api/activeconos';
    private resourceSearchUrl = '/consultas/api/_search/activeconos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(activecono: Activecono): Observable<Activecono> {
        const copy = this.convert(activecono);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(activecono: Activecono): Observable<Activecono> {
        const copy = this.convert(activecono);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Activecono> {
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
     * Convert a returned JSON object to Activecono.
     */
    private convertItemFromServer(json: any): Activecono {
        const entity: Activecono = Object.assign(new Activecono(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Activecono to a JSON which can be sent to the server.
     */
    private convert(activecono: Activecono): Activecono {
        const copy: Activecono = Object.assign({}, activecono);

        copy.dFechareg = this.dateUtils.toDate(activecono.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(activecono.dFechaupd);
        return copy;
    }
}
