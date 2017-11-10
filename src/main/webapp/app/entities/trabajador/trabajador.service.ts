import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TrabajadorService {

    private resourceUrl = SERVER_API_URL + 'api/trabajadors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/trabajadors';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(trabajador: Trabajador): Observable<Trabajador> {
        const copy = this.convert(trabajador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(trabajador: Trabajador): Observable<Trabajador> {
        const copy = this.convert(trabajador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Trabajador> {
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
     * Convert a returned JSON object to Trabajador.
     */
    private convertItemFromServer(json: any): Trabajador {
        const entity: Trabajador = Object.assign(new Trabajador(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Trabajador to a JSON which can be sent to the server.
     */
    private convert(trabajador: Trabajador): Trabajador {
        const copy: Trabajador = Object.assign({}, trabajador);

        copy.dFechareg = this.dateUtils.toDate(trabajador.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(trabajador.dFechaupd);
        return copy;
    }
}
