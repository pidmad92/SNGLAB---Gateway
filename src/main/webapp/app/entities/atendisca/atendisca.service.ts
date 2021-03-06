import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Atendisca } from './atendisca.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AtendiscaService {

    private resourceUrl = '/consultas/api/atendiscas';
    private resourceSearchUrl = '/consultas/api/_search/atendiscas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(atendisca: Atendisca): Observable<Atendisca> {
        const copy = this.convert(atendisca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(atendisca: Atendisca): Observable<Atendisca> {
        const copy = this.convert(atendisca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Atendisca> {
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
     * Convert a returned JSON object to Atendisca.
     */
    private convertItemFromServer(json: any): Atendisca {
        const entity: Atendisca = Object.assign(new Atendisca(), json);
        entity.dFechareg = this.dateUtils
            .convertDateTimeFromServer(json.dFechareg);
        entity.dFechaupd = this.dateUtils
            .convertDateTimeFromServer(json.dFechaupd);
        return entity;
    }

    /**
     * Convert a Atendisca to a JSON which can be sent to the server.
     */
    private convert(atendisca: Atendisca): Atendisca {
        const copy: Atendisca = Object.assign({}, atendisca);

        copy.dFechareg = this.dateUtils.toDate(atendisca.dFechareg);

        copy.dFechaupd = this.dateUtils.toDate(atendisca.dFechaupd);
        return copy;
    }
}
