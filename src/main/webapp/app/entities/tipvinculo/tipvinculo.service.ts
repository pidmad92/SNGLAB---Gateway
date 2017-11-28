import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipvinculo } from './tipvinculo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipvinculoService {

    private resourceUrl = '/consultas/api/tipvinculos';
    private resourceSearchUrl = '/consultas/api/_search/tipvinculos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipvinculo: Tipvinculo): Observable<Tipvinculo> {
        const copy = this.convert(tipvinculo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipvinculo: Tipvinculo): Observable<Tipvinculo> {
        const copy = this.convert(tipvinculo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipvinculo> {
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
     * Convert a returned JSON object to Tipvinculo.
     */
    private convertItemFromServer(json: any): Tipvinculo {
        const entity: Tipvinculo = Object.assign(new Tipvinculo(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipvinculo to a JSON which can be sent to the server.
     */
    private convert(tipvinculo: Tipvinculo): Tipvinculo {
        const copy: Tipvinculo = Object.assign({}, tipvinculo);

        copy.tFecreg = this.dateUtils.toDate(tipvinculo.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipvinculo.tFecupd);
        return copy;
    }
}
