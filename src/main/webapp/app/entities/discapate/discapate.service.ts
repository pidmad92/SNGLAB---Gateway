import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Discapate } from './discapate.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DiscapateService {

    private resourceUrl = '/consultas/api/discapates';
    private resourceSearchUrl = '/consultas/api/_search/discapates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(discapate: Discapate): Observable<Discapate> {
        const copy = this.convert(discapate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(discapate: Discapate): Observable<Discapate> {
        const copy = this.convert(discapate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Discapate> {
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
     * Convert a returned JSON object to Discapate.
     */
    private convertItemFromServer(json: any): Discapate {
        const entity: Discapate = Object.assign(new Discapate(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Discapate to a JSON which can be sent to the server.
     */
    private convert(discapate: Discapate): Discapate {
        const copy: Discapate = Object.assign({}, discapate);

        copy.tFecreg = this.dateUtils.toDate(discapate.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(discapate.tFecupd);
        return copy;
    }
}
