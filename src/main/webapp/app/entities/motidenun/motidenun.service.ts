import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motidenun } from './motidenun.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MotidenunService {

    private resourceUrl = '/denuncias/api/motidenuns';
    private resourceSearchUrl = '/denuncias/api/_search/motidenuns';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motidenun: Motidenun): Observable<Motidenun> {
        const copy = this.convert(motidenun);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motidenun: Motidenun): Observable<Motidenun> {
        const copy = this.convert(motidenun);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motidenun> {
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
     * Convert a returned JSON object to Motidenun.
     */
    private convertItemFromServer(json: any): Motidenun {
        const entity: Motidenun = Object.assign(new Motidenun(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Motidenun to a JSON which can be sent to the server.
     */
    private convert(motidenun: Motidenun): Motidenun {
        const copy: Motidenun = Object.assign({}, motidenun);

        copy.tFecreg = this.dateUtils.toDate(motidenun.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(motidenun.tFecupd);
        return copy;
    }
}
