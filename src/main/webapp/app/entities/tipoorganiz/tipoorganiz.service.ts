import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipoorganiz } from './tipoorganiz.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipoorganizService {

    private resourceUrl = '/sindicatos/api/tipoorganizs';
    private resourceSearchUrl = '/sindicatos/api/_search/tipoorganizs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipoorganiz: Tipoorganiz): Observable<Tipoorganiz> {
        const copy = this.convert(tipoorganiz);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoorganiz: Tipoorganiz): Observable<Tipoorganiz> {
        const copy = this.convert(tipoorganiz);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipoorganiz> {
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
     * Convert a returned JSON object to Tipoorganiz.
     */
    private convertItemFromServer(json: any): Tipoorganiz {
        const entity: Tipoorganiz = Object.assign(new Tipoorganiz(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipoorganiz to a JSON which can be sent to the server.
     */
    private convert(tipoorganiz: Tipoorganiz): Tipoorganiz {
        const copy: Tipoorganiz = Object.assign({}, tipoorganiz);

        copy.tFecreg = this.dateUtils.toDate(tipoorganiz.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipoorganiz.tFecupd);
        return copy;
    }
}
