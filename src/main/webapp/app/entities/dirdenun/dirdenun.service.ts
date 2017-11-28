import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dirdenun } from './dirdenun.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DirdenunService {

    private resourceUrl = '/denuncias/api/dirdenuns';
    private resourceSearchUrl = '/denuncias/api/_search/dirdenuns';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dirdenun: Dirdenun): Observable<Dirdenun> {
        const copy = this.convert(dirdenun);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dirdenun: Dirdenun): Observable<Dirdenun> {
        const copy = this.convert(dirdenun);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dirdenun> {
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
     * Convert a returned JSON object to Dirdenun.
     */
    private convertItemFromServer(json: any): Dirdenun {
        const entity: Dirdenun = Object.assign(new Dirdenun(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Dirdenun to a JSON which can be sent to the server.
     */
    private convert(dirdenun: Dirdenun): Dirdenun {
        const copy: Dirdenun = Object.assign({}, dirdenun);

        copy.tFecreg = this.dateUtils.toDate(dirdenun.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(dirdenun.tFecupd);
        return copy;
    }
}
