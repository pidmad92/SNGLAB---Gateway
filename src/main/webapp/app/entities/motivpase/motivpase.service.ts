import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Motivpase } from './motivpase.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MotivpaseService {

    private resourceUrl = '/consultas/api/motivpases';
    private resourceSearchUrl = '/consultas/api/_search/motivpases';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(motivpase: Motivpase): Observable<Motivpase> {
        const copy = this.convert(motivpase);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(motivpase: Motivpase): Observable<Motivpase> {
        const copy = this.convert(motivpase);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Motivpase> {
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
     * Convert a returned JSON object to Motivpase.
     */
    private convertItemFromServer(json: any): Motivpase {
        const entity: Motivpase = Object.assign(new Motivpase(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Motivpase to a JSON which can be sent to the server.
     */
    private convert(motivpase: Motivpase): Motivpase {
        const copy: Motivpase = Object.assign({}, motivpase);

        copy.tFecreg = this.dateUtils.toDate(motivpase.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(motivpase.tFecupd);
        return copy;
    }
}
