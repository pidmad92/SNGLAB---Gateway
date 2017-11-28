import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipinteres } from './tipinteres.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipinteresService {

    private resourceUrl = '/liquidaciones/api/tipinteres';
    private resourceSearchUrl = '/liquidaciones/api/_search/tipinteres';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipinteres: Tipinteres): Observable<Tipinteres> {
        const copy = this.convert(tipinteres);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipinteres: Tipinteres): Observable<Tipinteres> {
        const copy = this.convert(tipinteres);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipinteres> {
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
     * Convert a returned JSON object to Tipinteres.
     */
    private convertItemFromServer(json: any): Tipinteres {
        const entity: Tipinteres = Object.assign(new Tipinteres(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipinteres to a JSON which can be sent to the server.
     */
    private convert(tipinteres: Tipinteres): Tipinteres {
        const copy: Tipinteres = Object.assign({}, tipinteres);

        copy.tFecreg = this.dateUtils.toDate(tipinteres.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipinteres.tFecupd);
        return copy;
    }
}
