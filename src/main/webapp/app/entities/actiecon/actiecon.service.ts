import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Actiecon } from './actiecon.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ActieconService {

    private resourceUrl = '/consultas/api/actiecons';
    private resourceSearchUrl = '/consultas/api/_search/actiecons';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(actiecon: Actiecon): Observable<Actiecon> {
        const copy = this.convert(actiecon);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(actiecon: Actiecon): Observable<Actiecon> {
        const copy = this.convert(actiecon);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Actiecon> {
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
     * Convert a returned JSON object to Actiecon.
     */
    private convertItemFromServer(json: any): Actiecon {
        const entity: Actiecon = Object.assign(new Actiecon(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Actiecon to a JSON which can be sent to the server.
     */
    private convert(actiecon: Actiecon): Actiecon {
        const copy: Actiecon = Object.assign({}, actiecon);

        copy.tFecreg = this.dateUtils.toDate(actiecon.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(actiecon.tFecupd);
        return copy;
    }
}
