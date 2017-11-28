import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Tipdocident } from './tipdocident.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipdocidentService {

    private resourceUrl = '/consultas/api/tipdocidents';
    private resourceSearchUrl = '/consultas/api/_search/tipdocidents';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tipdocident: Tipdocident): Observable<Tipdocident> {
        const copy = this.convert(tipdocident);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipdocident: Tipdocident): Observable<Tipdocident> {
        const copy = this.convert(tipdocident);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tipdocident> {
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
     * Convert a returned JSON object to Tipdocident.
     */
    private convertItemFromServer(json: any): Tipdocident {
        const entity: Tipdocident = Object.assign(new Tipdocident(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Tipdocident to a JSON which can be sent to the server.
     */
    private convert(tipdocident: Tipdocident): Tipdocident {
        const copy: Tipdocident = Object.assign({}, tipdocident);

        copy.tFecreg = this.dateUtils.toDate(tipdocident.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(tipdocident.tFecupd);
        return copy;
    }
}
