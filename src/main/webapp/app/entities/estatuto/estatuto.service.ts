import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Estatuto } from './estatuto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstatutoService {

    private resourceUrl = '/sindicatos/api/estatutos';
    private resourceSearchUrl = '/sindicatos/api/_search/estatutos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(estatuto: Estatuto): Observable<Estatuto> {
        const copy = this.convert(estatuto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estatuto: Estatuto): Observable<Estatuto> {
        const copy = this.convert(estatuto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Estatuto> {
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
     * Convert a returned JSON object to Estatuto.
     */
    private convertItemFromServer(json: any): Estatuto {
        const entity: Estatuto = Object.assign(new Estatuto(), json);
        entity.tFecestatu = this.dateUtils
            .convertDateTimeFromServer(json.tFecestatu);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Estatuto to a JSON which can be sent to the server.
     */
    private convert(estatuto: Estatuto): Estatuto {
        const copy: Estatuto = Object.assign({}, estatuto);

        copy.tFecestatu = this.dateUtils.toDate(estatuto.tFecestatu);

        copy.tFecreg = this.dateUtils.toDate(estatuto.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(estatuto.tFecupd);
        return copy;
    }
}
