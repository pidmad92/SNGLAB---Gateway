import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Datdenu } from './datdenu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DatdenuService {

    private resourceUrl = '/denuncias/api/datdenus';
    private resourceSearchUrl = '/denuncias/api/_search/datdenus';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(datdenu: Datdenu): Observable<Datdenu> {
        const copy = this.convert(datdenu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(datdenu: Datdenu): Observable<Datdenu> {
        const copy = this.convert(datdenu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Datdenu> {
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
     * Convert a returned JSON object to Datdenu.
     */
    private convertItemFromServer(json: any): Datdenu {
        const entity: Datdenu = Object.assign(new Datdenu(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Datdenu to a JSON which can be sent to the server.
     */
    private convert(datdenu: Datdenu): Datdenu {
        const copy: Datdenu = Object.assign({}, datdenu);

        copy.tFecreg = this.dateUtils.toDate(datdenu.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(datdenu.tFecupd);
        return copy;
    }
}
