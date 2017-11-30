import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipolibro } from './tipolibro.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipolibroService {

    private resourceUrl = '/sindicatos/api/tipolibros';
    private resourceSearchUrl = '/sindicatos/api/_search/tipolibros';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipolibro: Tipolibro): Observable<Tipolibro> {
        const copy = this.convert(tipolibro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipolibro: Tipolibro): Observable<Tipolibro> {
        const copy = this.convert(tipolibro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipolibro> {
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
     * Convert a returned JSON object to Tipolibro.
     */
    private convertItemFromServer(json: any): Tipolibro {
        const entity: Tipolibro = Object.assign(new Tipolibro(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipolibro to a JSON which can be sent to the server.
     */
    private convert(tipolibro: Tipolibro): Tipolibro {
        const copy: Tipolibro = Object.assign({}, tipolibro);

        copy.tFecreg = this.dateUtils.toDate(tipolibro.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipolibro.tFecupd);
        return copy;
    }
}
