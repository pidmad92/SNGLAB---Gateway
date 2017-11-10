import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Oficina } from './oficina.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OficinaService {

    private resourceUrl = '/consultas/api/oficinas';
    private resourceSearchUrl = '/consultas/api/_search/oficinas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(oficina: Oficina): Observable<Oficina> {
        const copy = this.convert(oficina);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(oficina: Oficina): Observable<Oficina> {
        const copy = this.convert(oficina);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Oficina> {
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
     * Convert a returned JSON object to Oficina.
     */
    private convertItemFromServer(json: any): Oficina {
        const entity: Oficina = Object.assign(new Oficina(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Oficina to a JSON which can be sent to the server.
     */
    private convert(oficina: Oficina): Oficina {
        const copy: Oficina = Object.assign({}, oficina);

        copy.dFechareg = this.dateUtils.toDate(oficina.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(oficina.dFechaupd);
        return copy;
    }
}
