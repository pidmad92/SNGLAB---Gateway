import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Empleador } from './empleador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmpleadorService {

    private resourceUrl = '/consultas/api/empleadors';
    private resourceSearchUrl = '/consultas/api/_search/empleadors';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(empleador: Empleador): Observable<Empleador> {
        const copy = this.convert(empleador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(empleador: Empleador): Observable<Empleador> {
        const copy = this.convert(empleador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Empleador> {
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
     * Convert a returned JSON object to Empleador.
     */
    private convertItemFromServer(json: any): Empleador {
        const entity: Empleador = Object.assign(new Empleador(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Empleador to a JSON which can be sent to the server.
     */
    private convert(empleador: Empleador): Empleador {
        const copy: Empleador = Object.assign({}, empleador);

        copy.dFechareg = this.dateUtils.toDate(empleador.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(empleador.dFechaupd);
        return copy;
    }
}
