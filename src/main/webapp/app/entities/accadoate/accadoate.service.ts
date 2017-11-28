import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Accadoate } from './accadoate.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AccadoateService {

    private resourceUrl = '/consultas/api/accadoates';
    private resourceSearchUrl = '/consultas/api/_search/accadoates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(accadoate: Accadoate): Observable<Accadoate> {
        const copy = this.convert(accadoate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(accadoate: Accadoate): Observable<Accadoate> {
        const copy = this.convert(accadoate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Accadoate> {
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
     * Convert a returned JSON object to Accadoate.
     */
    private convertItemFromServer(json: any): Accadoate {
        const entity: Accadoate = Object.assign(new Accadoate(), json);
        entity.tFecreg = this.dateUtils
            .convertDateTimeFromServer(json.tFecreg);
        entity.tFecupd = this.dateUtils
            .convertDateTimeFromServer(json.tFecupd);
        return entity;
    }

    /**
     * Convert a Accadoate to a JSON which can be sent to the server.
     */
    private convert(accadoate: Accadoate): Accadoate {
        const copy: Accadoate = Object.assign({}, accadoate);

        copy.tFecreg = this.dateUtils.toDate(accadoate.tFecreg);

        copy.tFecupd = this.dateUtils.toDate(accadoate.tFecupd);
        return copy;
    }
}
