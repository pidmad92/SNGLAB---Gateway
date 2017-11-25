import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Pasegl } from './pasegl.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PaseglService {

    private resourceUrl = '/consultas/api/pasegls';
    private resourceSearchUrl = '/consultas/api/_search/pasegls';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pasegl: Pasegl): Observable<Pasegl> {
        const copy = this.convert(pasegl);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pasegl: Pasegl): Observable<Pasegl> {
        const copy = this.convert(pasegl);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pasegl> {
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
     * Convert a returned JSON object to Pasegl.
     */
    private convertItemFromServer(json: any): Pasegl {
        const entity: Pasegl = Object.assign(new Pasegl(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Pasegl to a JSON which can be sent to the server.
     */
    private convert(pasegl: Pasegl): Pasegl {
        const copy: Pasegl = Object.assign({}, pasegl);

        copy.tFecreg = this.dateUtils.toDate(pasegl.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(pasegl.tFecupd);
        return copy;
    }
}
